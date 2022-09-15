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

    @ApiResponse({type : UserInfo})
    @Get("/:userId/info")
	    async getUserInfoById(@Req() req: Request, @Param('userId', ParseIntPipe) userId : number)  : Promise<UserInfo>{
            const userProfile : UserInfo = await this.userService.getUserInfo(userId);
		    return userProfile
	}

	@ApiResponse({ type: Achievement })
	@Get("/:userId/achievements")
	async getUserachievements(@Param("userId", ParseIntPipe) userId: number): Promise<Achievement[]> {
		const achievement: Achievement[] = await this.userService.getAchievemnets(userId);
		return achievement;
	}
}