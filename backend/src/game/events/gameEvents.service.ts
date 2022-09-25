import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { ChatService as ChatEventsService } from "src/chat/events/chat.service";
import { ResponseDto } from "../dto/game.dto";

@Injectable()
export class GameEventsService {
	prisma: PrismaClient;

	constructor(private readonly chatEventsService: ChatEventsService) {
		this.prisma = new PrismaClient();
	}

	async joinGame(userId: number, scoreToWin: 3 | 7): Promise<ResponseDto> {
		try {
			if (scoreToWin != 3 && scoreToWin != 7) {
				scoreToWin = 3;
			}

			let match = await this.prisma.match.findFirst({
				where: {
					AND: [
						{
							scoreToWin: scoreToWin,
						},
						{
							isMatching: true,
						},
					],
				},
			});

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
				});

				const player1 = users.find((user) => user.id == match.player1Id);
				const player2 = users.find((user) => user.id == match.player2Id);
				// start game
				return {
					check: true,
					data: {
						matchId: match.id,
						player1,
						player2,
						scoreToWin: match.scoreToWin,
					},
				};
			} else {
				await this.prisma.match.create({
					data: {
						scoreToWin: scoreToWin,
						isMatching: true,
						player1Id: userId,
						live: false,
					},
				});
				// matching
				return {
					check: false,
				};
			}
		} catch (error) {
			console.error(error);
		}
	}


	getPlayersSockets(player1Id: number, player2Id: number) {
		const player1Sockets = this.chatEventsService.getReceiversSocket(player1Id);
		const player2Sockets = this.chatEventsService.getReceiversSocket(player2Id);
		return {
			player1Sockets,
			player2Sockets,
		};
	}
}
