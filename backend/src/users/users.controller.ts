import { Controller, Get, Param, ParseIntPipe, Req, UseGuards } from "@nestjs/common";
import { UserGuard } from "./user.guard";
// import { Request, Response } from "express";
import { UsersService } from "./users.service";
import { UserInfo } from "./dto/userInfo.dto";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { I18n, I18nContext } from "nestjs-i18n";
import { Achievement } from "./dto/achievement.dto";
import { Leaderboard } from "./dto/leaderboard.dto";

@UseGuards(UserGuard)
@ApiTags("users")
@Controller("users")
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

	@ApiResponse({ type: Achievement })
	@Get("/:userId/achievements")
	async getUserachievements(@Param("userId", ParseIntPipe) userId: number): Promise<Achievement[]> {
		const achievement: Achievement[] = await this.userService.getAchievemnets(userId);
		return achievement;
	}
}