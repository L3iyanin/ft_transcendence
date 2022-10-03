import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Match, PrismaClient } from "@prisma/client";

@Injectable()
export class GameService {
	prisma: PrismaClient;

	constructor() {
		this.prisma = new PrismaClient();
	}

	async getLiveMatches() {
		const matches = await this.prisma.match.findMany({
			where: {
				live: true,
			},
		});
		const users = await this.prisma.user.findMany();
		return matches.map((match) => {
			const player1 = users.find((user) => user.id === match.player1Id);
			const player2 = users.find((user) => user.id === match.player2Id);
			return {
				...match,
				player1,
				player2,
			};
		});
	}

	async getLastMatches(count: number) {
		const matches = await this.prisma.match.findMany({
			where: {
				live: false,
				isMatching: false,
			},
			orderBy: {
				date: "desc",
			},
			take: count,
		});
		const users = await this.prisma.user.findMany();
		return matches.map((match) => {
			const player1 = users.find((user) => user.id === match.player1Id);
			const player2 = users.find((user) => user.id === match.player2Id);
			return {
				...match,
				player1,
				player2,
			};
		});
	}

	async getLastMatchesByUser(count: number, userId: number) {
		const matches = await this.prisma.match.findMany({
			where: {
				live: false,
				isMatching: false,
				OR: [
					{
						player1Id: userId,
					},
					{
						player2Id: userId,
					},
				],
			},
			orderBy: {
				date: "desc",
			},
			take: count,
		});
		const users = await this.prisma.user.findMany();
		return matches.map((match) => {
			const player1 = users.find((user) => user.id === match.player1Id);
			const player2 = users.find((user) => user.id === match.player2Id);
			return {
				...match,
				player1,
				player2,
			};
		});
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

		} catch (err) {
			throw new HttpException(err.message, err.status);

		}
	}

	async discardInvitation(userId: number, matchId: number) {
		try {
			const match = await this.prisma.match.findUnique({
				where: {
					id: matchId,
				},
			});

			if (!match) {
				throw new HttpException("Match not found", HttpStatus.NOT_FOUND);
			}

			if (
				(match.player1Id === userId || match.player2Id === userId) &&
				match.isMatching &&
				match.matchByInvite
			) {
				// make validInvitation=false in message
				const ret = await this.makeValidInvitationFalse(matchId);

				// delete match
				await this.prisma.match.delete({
					where: {
						id: matchId,
					},
				});
				return ret;
			}
			throw new HttpException("You are not allowed to do this", HttpStatus.FORBIDDEN);
		} catch (err) {
			throw new HttpException(err.message, err.status);

		}
	}
}
