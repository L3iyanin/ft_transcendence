import { Controller, Get, Param, ParseIntPipe, Req, UseGuards } from "@nestjs/common";
import { UserGuard } from "./user.guard";
// import { Request, Response } from "express";
import { UsersService } from "./users.service";
import { UserInfo } from "./dto/user.dto";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { get } from "http";
import { I18n, I18nContext } from "nestjs-i18n";
import { Achievement } from "./dto/achievement.dto";

@UseGuards(UserGuard)
@ApiTags("users")
@Controller("users")
export class UsersController {
	constructor(private readonly userService: UsersService) {}

	@ApiResponse({ type: UserProfile })
	@Get("/:userId/info")
	async getUserInfoById(@Param("userId", ParseIntPipe) userId: number): Promise<UserProfile> {
		const userProfile: UserProfile = await this.userService.getUserInfo(userId);
		return userProfile;
	}

	// test i18

	@Get("wrongPassword")
	async getHello(@I18n() i18n: I18nContext) {
		return await i18n.t("translations.hello");
	}

	@ApiResponse({ type: Achievement })
	@Get("/:userId/achievements")
	getUserachievements() {
		return "";
	}
}