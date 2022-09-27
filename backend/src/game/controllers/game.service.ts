import { Injectable } from "@nestjs/common";
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
}
