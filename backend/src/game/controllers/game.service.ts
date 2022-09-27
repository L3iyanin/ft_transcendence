import { Injectable } from "@nestjs/common";
import { Match, PrismaClient } from "@prisma/client";

@Injectable()
export class GameService {
	prisma: PrismaClient;

	constructor() {
		this.prisma = new PrismaClient();
	}

	async getLiveMatches(): Promise<Match[]> {
		return this.prisma.match.findMany({
			where: {
				live: true,
			},
		});
	}

	async getLastMatches(count: number): Promise<Match[]> {
		return this.prisma.match.findMany({
			where: {
				live: false,
				isMatching: false,
			},
			orderBy: {
				date: "desc",
			},
			take: count,
		});
	}

	async getLastMatchesByUser(count: number, userId: number): Promise<Match[]> {
		return this.prisma.match.findMany({
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
	}
}
