import { Injectable } from "@nestjs/common";
import { Match, PrismaClient } from "@prisma/client";
import { OnlineUsersService } from "src/online-users/online-users.service";
import { LiveMatchDto, ResponseDto } from "../dto/game.dto";
import { Server, Socket } from "socket.io";
import { FPS } from "../constants/game.constants";
import GameLogic from "../gameLogic/gameLogic";
import { generateMatchName } from "../helpers/helpers";

@Injectable()
export class GameEventsService {
	prisma: PrismaClient;
	liveMatches: LiveMatchDto[] = [];

	constructor(private readonly onlineUsersService: OnlineUsersService) {
		this.prisma = new PrismaClient();
	}

	async joinGame(userId: number, scoreToWin: 3 | 7, clientId: string): Promise<ResponseDto> {
		try {
			if (scoreToWin != 3 && scoreToWin != 7) {
				scoreToWin = 3;
			}

			let matches = await this.prisma.match.findMany({
				where: {
					AND: [
						{
							scoreToWin: scoreToWin,
						},
						{
							OR: [
								{
									isMatching: true,
								},
								{
									live: true,
								},
							],
						},
						{
							matchByInvite: false,
						},
					],
				},
			});

			if (matches.length > 0) {
				if (
					matches.some((match) => {
						return match.player1Id == userId || match.player2Id == userId;
					})
				) {
					return {
						check: "ALREADY_IN_MATCH",
					};
				}
			}
			const matchingMatches = matches.filter((match) => match.isMatching);
			let match = matchingMatches.length > 0 ? matchingMatches[0] : null;
			if (match) {
				match = await this.prisma.match.update({
					where: {
						id: match.id,
					},
					data: {
						isMatching: false,
						player2Id: userId,
						live: true,
					},
				});

				const users = await this.prisma.user.findMany({
					where: {
						OR: [
							{
								id: match.player1Id,
							},
							{
								id: match.player2Id,
							},
						],
					},
					select: {
						id: true,
						username: true,
						fullName: true,
						imgUrl: true,
						wins: true,
						losses: true,
						achievements: {
							select: {
								id: true,
							},
						},
						twoFactorAuth: true,
						login: true,
					},
				});

				const player1 = users.find((user) => user.id == match.player1Id);

				const player2 = users.find((user) => user.id == match.player2Id);

				this.onlineUsersService.setSocketInGame(clientId); // setting socket of player2 in game

				// start game
				return {
					check: "START_MATCH",
					data: {
						matchId: match.id,
						player1,
						player2,
						scoreToWin: match.scoreToWin,
					},
				};
			} else if (!match) {
				await this.prisma.match.create({
					data: {
						scoreToWin: scoreToWin,
						isMatching: true,
						player1Id: userId,
						live: false,
					},
				});

				this.onlineUsersService.setSocketInGame(clientId); // setting socket of player1 in game

				return {
					check: "MATCHING",
				};
			}
		} catch (error) {
			console.error(error);
		}
	}

	// ? called by the disconnect event in OnlineUsersGateway
	async handleDisconnectFromGame(userId: number, client: Socket) {
		// if match.isMatching == true, and player1Id == userId, delete match
		if (!userId) {
			return;
		}
		let match = await this.prisma.match.findFirst({
			where: {
				AND: [
					{
						player1Id: userId,
					},
					{
						isMatching: true,
					},
				],
			},
		});

		if (match && match.isMatching && !match.live) {
			await this.prisma.match.delete({
				where: {
					id: match.id,
				},
			});
			return;
		}

		match = await this.prisma.match.findFirst({
			where: {
				AND: [
					{
						OR: [
							{
								player1Id: userId,
							},
							{
								player2Id: userId,
							},
						],
					},
					{
						live: true,
					},
				],
			},
		});

		if (match && match.live) {
			// await this.prisma.match.delete({
			// 	where: {
			// 		id: match.id,
			// 	},
			// });
			// return;
			const liveMatch = this.getLiveMatch(match.id);
			if (!liveMatch) {
				return;
			}
			const gameState = liveMatch.gameInstance.getGameState();
			let player1Score = gameState.player1Score;
			let player2Score = gameState.player2Score;
			let winnerId = userId == match.player1Id ? match.player2Id : match.player1Id;
			let loserId = userId == match.player1Id ? match.player1Id : match.player2Id;

			if (player1Score > player2Score && winnerId == match.player2Id) {
				player1Score = player2Score + 1;
			} else if (player2Score > player1Score && winnerId == match.player1Id) {
				player2Score = player1Score + 1;
			}

			const endMatch = await this.prisma.match.update({
				where: {
					id: match.id,
				},
				data: {
					live: false,
					player1Score: gameState.player1Score,
					player2Score: gameState.player2Score,
				},
			});

			const matchName = generateMatchName(match.id);

			liveMatch.server.to(matchName).emit("gameOver", {
				player1Score: endMatch.player1Score,
				player2Score: endMatch.player2Score,
				isDisconnected: true,
			});

			await this.prisma.user.update({
				where: {
					id: winnerId,
				},
				data: {
					wins: {
						increment: 1,
					},
				},
			});

			await this.prisma.user.update({
				where: {
					id: loserId,
				},
				data: {
					losses: {
						increment: 1,
					},
				},
			});

			clearInterval(liveMatch.interval);
			this.removeLiveMatch(match.id);
		}
	}

	getPlayersSockets(
		player1Id: number,
		player2Id: number
	): { player1Socket: Socket | null; player2Socket: Socket | null } {
		const player1Socket = this.onlineUsersService.getUserGameSocket(player1Id);
		const player2Socket = this.onlineUsersService.getUserGameSocket(player2Id);
		return {
			player1Socket,
			player2Socket,
		};
	}

	async getUsername(userId: number) {
		const user = await this.prisma.user.findUnique({
			where: {
				id: userId,
			},
		});
		return user.username;
	}

	async readyToPlay(userId: number, matchId: number, server: Server) {
		// check if user is in match and if he is player1 or player2
		// set him as ready
		// if both players are ready, start game loop

		let match = await this.prisma.match.findUnique({
			where: {
				id: matchId,
			},
		});

		if (!match) {
			return "match not found";
		}

		if (match.player1Id == userId) {
			match = await this.prisma.match.update({
				where: {
					id: match.id,
				},
				data: {
					player1Ready: true,
				},
			});
		} else if (match.player2Id == userId) {
			match = await this.prisma.match.update({
				where: {
					id: match.id,
				},
				data: {
					player2Ready: true,
				},
			});
		}

		if (match.player1Ready && match.player2Ready) {
			// start game loop
			this.startGameLoop(match, server);
			return "game started";
		}

		return "waiting for other player";
	}

	async gameTurn(gameInstance: GameLogic, match: Match, server: Server) {
		console.log("game turn------------------");
		gameInstance.updateBallPosition();
		const gameState = gameInstance.getGameState();
		const matchName = generateMatchName(match.id);
		let winnerId: number | null = null;

		console.log("gameState", gameState);
		console.log("------------------");
		if (gameState.player1Score >= match.scoreToWin) {
			winnerId = match.player1Id;
		} else if (gameState.player2Score >= match.scoreToWin) {
			winnerId = match.player2Id;
		}

		if (!winnerId) {
			server.to(matchName).emit("gameState", gameState);
		} else {
			// end game
			server.to(matchName).emit("gameState", gameState); // last goal
			const endMatch = await this.prisma.match.update({
				where: {
					id: match.id,
				},
				data: {
					live: false,
					player1Score: gameState.player1Score,
					player2Score: gameState.player2Score,
				},
			});

			server.to(matchName).emit("gameOver", {
				player1Score: endMatch.player1Score,
				player2Score: endMatch.player2Score,
				isDisconnected: false,
			});

			const loserId = winnerId == match.player1Id ? match.player2Id : match.player1Id;

			// update user stats
			await this.prisma.user.update({
				where: {
					id: winnerId,
				},
				data: {
					wins: {
						increment: 1,
					},
				},
			});

			await this.prisma.user.update({
				where: {
					id: loserId,
				},
				data: {
					losses: {
						increment: 1,
					},
				},
			});
			// clearinterval
			const liveMatch = this.getLiveMatch(match.id);
			if (liveMatch) {
				clearInterval(liveMatch.interval);
				this.removeLiveMatch(match.id);
			}
		}
	}

	async startGameLoop(match: Match, server: Server) {
		console.log("starting game loop " + match.id);
		const gameInstance = new GameLogic();
		const interval = setInterval(async () => {
			await this.gameTurn(gameInstance, match, server);
		}, 1000 / FPS);
		// store interval somewhere
		// this.gameTurn(gameInstance, match, server)
		this.addLiveMatch(match, interval, gameInstance, server);
	}

	addLiveMatch(match: Match, interval: NodeJS.Timer, gameInstance: GameLogic, server: Server) {
		this.liveMatches.push({
			id: match.id,
			player1Id: match.player1Id,
			player2Id: match.player2Id,
			scoreToWin: match.scoreToWin,
			interval,
			gameInstance,
			server,
		});
	}

	removeLiveMatch(matchId: number) {
		this.liveMatches = this.liveMatches.filter((match) => match.id != matchId);
	}

	getLiveMatch(matchId: number) {
		return this.liveMatches.find((match) => match.id == matchId);
	}

	async updatePlayerY(matchId: number, userId: number, newY: number) {
		const liveMatch = this.getLiveMatch(matchId);
		if (liveMatch) {
			if (liveMatch.player1Id == userId) {
				liveMatch.gameInstance.updatePlayerY(newY, 1);
			} else if (liveMatch.player2Id == userId) {
				liveMatch.gameInstance.updatePlayerY(newY, 2);
			}
		}
	}
}
