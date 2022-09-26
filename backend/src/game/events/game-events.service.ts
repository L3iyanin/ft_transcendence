import { Injectable } from "@nestjs/common";
import { Match, PrismaClient } from "@prisma/client";
import { OnlineUsersService } from "src/online-users/online-users.service";
import { ResponseDto } from "../dto/game.dto";
import { Socket } from "socket.io";

@Injectable()
export class GameEventsService {
	prisma: PrismaClient;

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
						loses: true,
						achievements: {
							select: {
								id: true,
							},
						},
						twoFactorAuth: true,
						login: true,
					}
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
			// handle disconnect from live match
			// end game and emit result to other player
			await this.prisma.match.delete({
				where: {
					id: match.id,
				},
			});
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

	async readyToPlay(userId: number, matchId: number) {
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
		}
		else if (match.player2Id == userId) {
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
			this.startGameLoop(match);
			return "game started";
		}

		return "waiting for other player";

	}

	async startGameLoop(match: Match) {
		console.log("starting game loop " + match.id);
	}

}
