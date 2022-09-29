import { Controller, Get, Param, ParseIntPipe, Post, Req, UseGuards } from "@nestjs/common";
import { ApiProperty, ApiTags } from "@nestjs/swagger";
import { Match } from "@prisma/client";
import { UserGuard } from "src/users/user.guard";
import { GameService } from "./game.service";

@UseGuards(UserGuard)
@ApiTags("game")
@Controller("game")
export class GameController {
	constructor(private readonly gameService: GameService) {}

	// get live matches
	@ApiProperty()
	@Get("live-matches")
	getLiveMatches() {
		return this.gameService.getLiveMatches();
	}

	// get last x played matches (not live and not matching)
	@ApiProperty()
	@Get("last-matches/:count")
	getLastMatches(@Param("count", ParseIntPipe) count: number) {
		return this.gameService.getLastMatches(count);
	}

	// get last x played matches (not live and not matching) by user
	@ApiProperty()
	@Get("last-matches/:count/:userId")
	getLastMatchesByUser(
		@Param("count", ParseIntPipe) count: number,
		@Param("userId", ParseIntPipe) userId: number
	) {
		return this.gameService.getLastMatchesByUser(count, userId);
	}

	// make validInvitation=true
	@ApiProperty()
	@Post("discard-invitation/:matchId")
	discardInvitation(
		@Req() req,
		@Param("matchId", ParseIntPipe) matchId: number,
	) {
		return this.gameService.discardInvitation(req.user.id, matchId);
	}
}
