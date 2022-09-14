import { Controller, Get, Param, ParseIntPipe, Req, UseGuards } from "@nestjs/common";
import { UserGuard } from "./user.guard";
import { Request, Response } from "express";
import { UsersService } from "./users.service";
import { UserProfile } from "./user.interface";
import {  ApiResponse, ApiTags } from "@nestjs/swagger";

@UseGuards(UserGuard)
@Controller("users")
@ApiTags("users")
export class UsersController {
    constructor(private readonly userService : UsersService){}

    @ApiResponse({type : UserProfile})
    @Get("/:userId/info")
	    async getUserInfoById(@Req() req: Request, @Param('userId', ParseIntPipe) userId : number)  : Promise<UserProfile>{
            const userProfile : UserProfile = await this.userService.getUserInfo(userId);
		    return userProfile
	}

	@Get("/:userId/achievements")
    getUserachievements() {
        return "";
    }
}
