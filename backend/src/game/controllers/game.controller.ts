import { Controller, Get, Param, ParseIntPipe } from "@nestjs/common";
import { Match } from "@prisma/client";
import { GameService } from "./game.service";

@Controller("game")
export class GameController {
	constructor(private readonly gameService: GameService) {}

	// get live matches
	@Get("live-matches")
	async getLiveMatches(): Promise<Match[]> {
		return this.gameService.getLiveMatches();
	}

	// get last x played matches (not live and not matching)
	@Get("last-matches/:count")
	async getLastMatches(@Param("count", ParseIntPipe) count: number): Promise<Match[]> {
		return this.gameService.getLastMatches(count);
	}

	// get last x played matches (not live and not matching) by user
	@Get("last-matches/:count/:userId")
	async getLastMatchesByUser(
		@Param("count", ParseIntPipe) count: number,
		@Param("userId", ParseIntPipe) userId: number
	): Promise<Match[]> {
		return this.gameService.getLastMatchesByUser(count, userId);
	}



}
