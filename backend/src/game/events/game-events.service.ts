import { HttpStatus, Injectable } from "@nestjs/common";
import { Match, PrismaClient, User } from "@prisma/client";
import { OnlineUsersService } from "src/online-users/online-users.service";
import { JoinMatchDto, LiveMatchDto, ResponseDto, SpectatorDto } from "../dto/game-events.dto";
import { Server, Socket } from "socket.io";
import { FPS } from "../constants/game.constants";
import GameLogic from "../gameLogic/gameLogic";
import { generateMatchName, generateSpectatorsRoomName } from "../helpers/helpers";
import { HttpException } from "@nestjs/common";
import { generateChannelName } from "src/chat/helpers/helpers";

let liveMatches: LiveMatchDto[] = [];

@Injectable()
export class GameEventsService {
	prisma: PrismaClient;

	constructor(
		private readonly onlineUsersService: OnlineUsersService,
	) {
		this.prisma = new PrismaClient();
	}

	async sendInviteMessage(payload: JoinMatchDto, clientId: string, server: Server, matchId: number) {
		const channelName = generateChannelName(payload.inviterUserId, payload.invitedUserId);

		const channel = await this.prisma.channel.findUnique({
			where: {
				name: channelName,
			},
		});
		const member = await this.prisma.member.findUnique({
			where: {
				userId_channelId: {
					userId: payload.invitedUserId,
					channelId: channel.id,
				},
			},
			include: {
				user: true,
			},
		});
		const message = await this.prisma.message.create({
			data: {
				content: "Invite to play",
				from: {
					connect: {
						id: member.id,
					},
				},
				channel: {
					connect: {
						id: channel.id,
					},
				},
				invite: true,
				inviterId: payload.inviterUserId,
				invitedId: payload.invitedUserId,
				matchId: matchId,
				scoreToWin: payload.scoreToWin,
				validInvitation: true,
			},
		});

		const inviterSocket = this.onlineUsersService.getUserSockets(payload.inviterUserId);
		const invitedSocket = this.onlineUsersService.getUserSockets(payload.invitedUserId);
		inviterSocket.forEach((socket) => {
			socket.join(channelName);
		});
		invitedSocket.forEach((socket) => {
			socket.join(channelName);
		});

		server.to(channelName).emit("receivedMessage", {
			from: member,
			content: message.content,
			channelId: channel.id,
			isDm: true,
			invite: true,
			inviterId: message.inviterId,
			invitedId: message.invitedId,
			matchId: message.matchId,
			scoreToWin: message.scoreToWin,
		});

	}

	async joinInviteMatch(
		payload: JoinMatchDto,
		clientId: string,
		server: Server
	): Promise<ResponseDto> {
		try {
			const { inviterUserId, invitedUserId, userId, matchId, scoreToWin } = payload;
			if (userId === inviterUserId) {
				// create match and return Matching
				const match = await this.prisma.match.create({
					data: {
						scoreToWin,
						isMatching: true,
						player1Id: inviterUserId,
						player2Id: invitedUserId,
						live: false,
						matchByInvite: true,
					},
				});
				this.onlineUsersService.setSocketInGame(clientId); // setting socket of player1 in game

				await this.sendInviteMessage(payload, clientId, server, match.id);

				return {
					check: "MATCHING",
				};
			} else if (userId === invitedUserId) {
				const match = await this.prisma.match.findMany({
					where: {
						id: matchId,
						player1Id: inviterUserId,
						player2Id: invitedUserId,
						isMatching: true,
					},
				});
				if (match.length !== 1) {
					return {
						check: "MATCH_NOT_FOUND",
					};
				}
				// update match and return Start match
				await this.prisma.match.update({
					where: {
						id: matchId,
					},
					data: {
						isMatching: false,
						live: true,
					},
				});

				const { player1, player2 } = await this.populatePlayers(
					match[0].player1Id,
					match[0].player2Id
				);

				this.onlineUsersService.setSocketInGame(clientId); // setting socket of player2 in game
				return {
					check: "START_MATCH",
					data: {
						matchId,
						player1,
						player2,
						scoreToWin,
					},
				};
			}
		} catch (error) {
			console.log(error);
		}
	}

	async validateJoinGame(payload: JoinMatchDto) {
		const { userId } = payload;
		let matches = await this.prisma.match.findMany({
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
						OR: [
							{
								isMatching: true,
							},
							{
								live: true,
							},
						],
					},
				],
			},
		});
		// remove matches that are matching, and the invited user is trying to join
		// because the invited is already in the match as player2Id
		matches = matches.filter((match) => {
			if (match.isMatching && match.player2Id === userId) {
				return false;
			}
			return true;
		});
		if (matches.length > 0) {
			return {
				check: "ALREADY_IN_MATCH",
			};
		}
		return {
			check: "OK",
		};
	}

	async joinGame(payload: JoinMatchDto, clientId: string, server: Server): Promise<ResponseDto> {
		try {
			if (payload.scoreToWin != 3 && payload.scoreToWin != 7) {
				payload.scoreToWin = 3;
			}

			// check if any of the users is in a live match or is matching regardless of the scoreToWin
			const validationResult = await this.validateJoinGame(payload);
			if (validationResult.check === "ALREADY_IN_MATCH") {
				return {
					check: "ALREADY_IN_MATCH",
				};
			}

			if (payload.invite) {
				return await this.joinInviteMatch(payload, clientId, server);
			}

			let matchingMatches = await this.prisma.match.findMany({
				where: {
					AND: [
						{
							scoreToWin: payload.scoreToWin,
						},
						{
							isMatching: true,
						},
						{
							matchByInvite: false,
						},
					],
				},
			});

			let match = matchingMatches.length > 0 ? matchingMatches[0] : null;
			if (match) {
				match = await this.prisma.match.update({
					where: {
						id: match.id,
					},
					data: {
						isMatching: false,
						player2Id: payload.userId,
						live: true,
					},
				});

				const { player1, player2 } = await this.populatePlayers(
					match.player1Id,
					match.player2Id
				);

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
						scoreToWin: payload.scoreToWin,
						isMatching: true,
						player1Id: payload.userId,
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
		const socketInGame = this.onlineUsersService.getUserGameSocket(userId);
		if (socketInGame && socketInGame.id !== client.id) {
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

		if (match && match.matchByInvite) {
			// make validInvitation=false in message
			const ret = await this.makeValidInvitationFalse(match.id);

			// delete match
			await this.prisma.match.delete({
				where: {
					id: match.id,
				},
			});
			return;
		}

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
			const liveMatch = this.getLiveMatch(match.id);
			if (!liveMatch) {
				return;
			}
			clearInterval(liveMatch.interval);
			const gameState = liveMatch.gameInstance.getGameState();
			let player1Score = gameState.player1Score;
			let player2Score = gameState.player2Score;
			let winnerId = userId == match.player1Id ? match.player2Id : match.player1Id;
			let loserId = userId == match.player1Id ? match.player1Id : match.player2Id;

			if (player1Score >= player2Score && winnerId == match.player1Id) {
				player1Score = player2Score + 1;
			} else if (player2Score >= player1Score && winnerId == match.player2Id) {
				player2Score = player1Score + 1;
			}

			const endMatch = await this.prisma.match.update({
				where: {
					id: match.id,
				},
				data: {
					live: false,
					player1Score: player1Score,
					player2Score: player2Score,
				},
			});

			const matchName = generateMatchName(match.id);

			liveMatch.server.to(matchName).emit("gameOver", {
				player1Score: endMatch.player1Score,
				player2Score: endMatch.player2Score,
				isDisconnected: true,
			});

			const winner = await this.prisma.user.update({
				where: {
					id: winnerId,
				},
				data: {
					wins: {
						increment: 1,
					},
				},
			});

			const loser = await this.prisma.user.update({
				where: {
					id: loserId,
				},
				data: {
					losses: {
						increment: 1,
					},
				},
			});

			await this.updateUserAcheivements(endMatch, winner, loser);
			await this.updateUserAcheivements(endMatch, loser, winner);
			if (endMatch.matchByInvite) {
				await this.makeValidInvitationFalse(endMatch.id);
			}

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
		gameInstance.updateBallPosition();
		const gameState = gameInstance.getGameState();
		const matchName = generateMatchName(match.id);
		const spectatorRoomName = generateSpectatorsRoomName(match.id);
		let winnerId: number | null = null;

		if (gameState.player1Score >= match.scoreToWin) {
			winnerId = match.player1Id;
		} else if (gameState.player2Score >= match.scoreToWin) {
			winnerId = match.player2Id;
		}

		server.to(matchName).emit("gameState", gameState);
		server.to(spectatorRoomName).emit("gameStateSpectators", gameState);
		if (winnerId) {
			// clearinterval
			const liveMatch = this.getLiveMatch(match.id);
			if (liveMatch) {
				clearInterval(liveMatch.interval);
			}
			// end game
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

			server.to(spectatorRoomName).emit("gameOver", {
				player1Score: endMatch.player1Score,
				player2Score: endMatch.player2Score,
				isDisconnected: false,
			});

			const loserId = winnerId == match.player1Id ? match.player2Id : match.player1Id;

			// update user stats
			const winner = await this.prisma.user.update({
				where: {
					id: winnerId,
				},
				data: {
					wins: {
						increment: 1,
					},
				},
			});

			const loser = await this.prisma.user.update({
				where: {
					id: loserId,
				},
				data: {
					losses: {
						increment: 1,
					},
				},
			});

			await this.updateUserAcheivements(endMatch, winner, loser);
			await this.updateUserAcheivements(endMatch, loser, winner);
			if (endMatch.matchByInvite) {
				await this.makeValidInvitationFalse(endMatch.id);
			}
			if (liveMatch) {
				this.removeLiveMatch(match.id);
			}
		}
	}

	async startGameLoop(match: Match, server: Server) {
		const gameInstance = new GameLogic();
		const interval = setInterval(async () => {
			await this.gameTurn(gameInstance, match, server);
		}, 1000 / FPS);
		// store interval somewhere
		this.addLiveMatch(match, interval, gameInstance, server);
	}

	addLiveMatch(match: Match, interval: NodeJS.Timer, gameInstance: GameLogic, server: Server) {
		const spectators: SpectatorDto[] = [];
		liveMatches.push({
			id: match.id,
			player1Id: match.player1Id,
			player2Id: match.player2Id,
			scoreToWin: match.scoreToWin,
			interval,
			gameInstance,
			server,
			spectators,
		});
	}

	removeLiveMatch(matchId: number) {
		liveMatches = liveMatches.filter((match) => match.id != matchId);
	}

	getLiveMatch(matchId: number) {
		return liveMatches.find((match) => match.id == matchId);
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

	async addSpectatorToLiveMatch(clientId: string, matchId: number, userId: number) {
		const liveMatch = this.getLiveMatch(matchId);
		const match = await this.prisma.match.findUnique({
			where: {
				id: matchId,
			},
		});
		if (match) {
			if (match.player1Id == userId || match.player2Id == userId) {
				return {
					status: "ERROR",
					message: "You are already a player in this match",
				};
			}
		}
		if (liveMatch) {
			const spectator = liveMatch.spectators.find((spectator) => spectator.userId == userId);
			if (!spectator) {
				liveMatch.spectators.push({
					userId,
				});
			}

			const spectatorsPopulated = await this.populateSpectators(liveMatch.spectators);
			const player1 = await this.prisma.user.findUnique({
				where: {
					id: liveMatch.player1Id,
				},
			});
			const player2 = await this.prisma.user.findUnique({
				where: {
					id: liveMatch.player2Id,
				},
			});
			const scoreToWin = liveMatch.scoreToWin;
			const matchSettings = {
				matchId,
				player1,
				player2,
				scoreToWin,
			};
			return {
				status: "SUCCESS",
				message: "You are now a spectator",
				spectators: spectatorsPopulated,
				matchSettings,
			};
		}
		return {
			status: "ERROR",
			message: "Match not found",
		};
	}

	async populateSpectators(spectators: SpectatorDto[]) {
		const users = await this.prisma.user.findMany({
			where: {
				id: {
					in: spectators.map((spectator) => spectator.userId),
				},
			},
		});
		return users;
	}

	async populatePlayers(player1Id: number, player2Id: number) {
		const users = await this.prisma.user.findMany({
			// where: {
			// 	OR: [
			// 		{
			// 			id: player1Id,
			// 		},
			// 		{
			// 			id: player2Id,
			// 		},
			// 	],
			// },
			where: {
				id: {
					in: [player1Id, player2Id],
				},
			},
			select: {
				id: true,
				username: true,
				fullName: true,
				imgUrl: true,
				wins: true,
				losses: true,
				email: true,
				achievements: {
					select: {
						id: true,
					},
				},
				twoFactorAuth: true,
				TwoFaSecret: true,
				login: true,
			},
		});

		const player1 = users.find((user) => user.id == player1Id);

		const player2 = users.find((user) => user.id == player2Id);

		return {
			player1,
			player2,
		};
	}

	async updateUserAcheivements(match: Match, player: User, opponent: User) {
		try {
			const allUserMatches = await this.prisma.match.findMany({
				where: {
					OR: [
						{
							player1Id: player.id,
						},
						{
							player2Id: player.id,
						},
					],
				},
				orderBy: {
					date: "desc",
				},
				take: 5,
			});

			let countWinsInRow = 0;
			console.log("allUserMatches", allUserMatches);
			for (let i = 0; i < allUserMatches.length; i++) {
				const userMatch = allUserMatches[i];
				if (
					userMatch.player1Id == player.id &&
					userMatch.player1Score > userMatch.player2Score
				)
					countWinsInRow++;
				else if (
					userMatch.player2Id == player.id &&
					userMatch.player1Score < userMatch.player2Score
				)
					countWinsInRow++;
				else break;
			}
			console.log("countWinsInRow", countWinsInRow);

			//? id 1
			//? win first played match
			if (player.wins == 1 && player.losses == 0) {
				await this.addAcheivementToUser(player.id, 1);
			}

			//? id 2
			//? Win 2 Match in row
			if (countWinsInRow == 2) {
				await this.addAcheivementToUser(player.id, 2);
			}

			//? id 3
			//? you win vs khalid
			if (
				player.id == match.player1Id &&
				match.player1Score > match.player2Score &&
				opponent.login == "kbenlyaz"
			) {
				await this.addAcheivementToUser(player.id, 3);
			} else if (
				player.id == match.player2Id &&
				match.player1Score < match.player2Score &&
				opponent.login == "kbenlyaz"
			) {
				await this.addAcheivementToUser(player.id, 3);
			}

			//? id 4
			// ?Win with clean sheet
			if (
				player.id == match.player1Id &&
				match.player1Score > match.player2Score &&
				match.player2Score == 0
			) {
				await this.addAcheivementToUser(player.id, 4);
			} else if (
				player.id == match.player2Id &&
				match.player1Score < match.player2Score &&
				match.player1Score == 0
			) {
				await this.addAcheivementToUser(player.id, 4);
			}

			//? id 5
			//? Win 5 Match in row
			if (countWinsInRow == 5) {
				await this.addAcheivementToUser(player.id, 5);
			}
		} catch (err) {
			throw new HttpException(err.message, err.status);
		}
	}

	async addAcheivementToUser(userId: number, achievementId: number) {
		try {
			await this.prisma.user.update({
				where: {
					id: userId,
				},
				data: {
					achievements: {
						connect: [
							{
								id: achievementId,
							},
						],
					},
				},
			});
		} catch (err) {
			throw new HttpException(err.message, err.status);
		}
	}

	async makeValidInvitationFalse(matchId: number) {
		try {
			const match = await this.prisma.match.findUnique({
				where: {
					id: matchId,
				},
			});
			if (!match) {
				throw new HttpException("Match not found", HttpStatus.NOT_FOUND);
			}
			if (!match.matchByInvite) {
				throw new HttpException("Match is not by invite", HttpStatus.BAD_REQUEST);
			}
			const message = await this.prisma.message.findUnique({
				where: {
					matchId,
				},
			});
			if (!message) {
				throw new HttpException("Message not found", HttpStatus.NOT_FOUND);
			}
			const newMessage = await this.prisma.message.update({
				where: {
					id: message.id,
				},
				data: {
					validInvitation: false,
				},
			});
			return {
				newMessage,
				message: "Invitation is no longer valid",
			}

		} catch (error) {
			console.log(error);
		}
	}

}
