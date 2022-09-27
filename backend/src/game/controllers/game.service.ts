import { Injectable } from "@nestjs/common";
import { Match, PrismaClient } from "@prisma/client";

@Injectable()
export class GameService {
	prisma: PrismaClient;

	constructor() {
		this.prisma = new PrismaClient();
	}

	async getLiveMatches() {
		const matches = this.prisma.match.findMany({
			where: {
				live: true,
			},
		});
		const users = this.prisma.user.findMany();
		return Promise.all([matches, users]).then((values) => {
			const matches = values[0];
			const users = values[1];
			return matches.map((match) => {
				return {
					...match,
					player1: users.find((user) => user.id === match.player1Id),
					player2: users.find((user) => user.id === match.player2Id),
				};
			});
		});
	}

	async getLastMatches(count: number) {
		const matches = this.prisma.match.findMany({
			where: {
				live: false,
				isMatching: false,
			},
			orderBy: {
				date: "desc",
			},
			take: count,
		});
		const users = this.prisma.user.findMany();
		return Promise.all([matches, users]).then((values) => {
			const matches = values[0];
			const users = values[1];
			return matches.map((match) => {
				return {
					...match,
					player1: users.find((user) => user.id === match.player1Id),
					player2: users.find((user) => user.id === match.player2Id),
				};
			});
		});
	}

	async getLastMatchesByUser(count: number, userId: number) {
		const matches = this.prisma.match.findMany({
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
		const users = this.prisma.user.findMany();
		return Promise.all([matches, users]).then((values) => {
			const matches = values[0];
			const users = values[1];
			return matches.map((match) => {
				return {
					...match,
					player1: users.find((user) => user.id === match.player1Id),
					player2: users.find((user) => user.id === match.player2Id),
				};
			});
		});
	}
}
