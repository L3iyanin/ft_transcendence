import { Controller, Get, Param, ParseIntPipe, Req, UseGuards } from "@nestjs/common";
import { UserGuard } from "./user.guard";
// import { Request, Response } from "express";
import { UsersService } from "./users.service";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { I18n, I18nContext } from "nestjs-i18n";
import { UserInfo } from "./dto/user-info.dto";
import { Leaderboard } from "./dto/leaderboard.dto";

@UseGuards(UserGuard)
@Controller("users")
@ApiTags("users")
export class UsersController {
	constructor(private readonly userService: UsersService) {}

	@ApiResponse({ type: UserInfo })
	@Get("/:userId/info")
	async getUserInfo(@Param("userId", ParseIntPipe) userId: number): Promise<UserInfo> {
		const userInfo: UserInfo = await this.userService.getUserInfoById(userId);
		return userInfo;
	}

	@Get("leaderboard")
	async getLeaderboard(): Promise<Leaderboard[]> {
		const leaderboard: Leaderboard[] = await this.userService.getLeaderboard();
		return leaderboard;
	}

	// test i18
	@Get("wrongPassword")
	async getHello(@I18n() i18n: I18nContext) {
		return await i18n.t("tr.errors.user.wrongPassword");
	}

	@Get("/:userId/achievements")
	getUserachievements() {
		return "";
	}
}
