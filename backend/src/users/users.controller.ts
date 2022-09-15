import { Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Req, UseGuards} from "@nestjs/common";
import { UserGuard } from "./user.guard";
import { UsersService } from "./users.service";
import { UserInfo } from "./dto/userInfo.dto";
import { ApiProperty, ApiResponse, ApiTags } from "@nestjs/swagger";
import { I18n, I18nContext } from "nestjs-i18n";
import { Achievement } from "./dto/achievement.dto";
import { Leaderboard } from "./dto/leaderboard.dto";
import { Friend } from "./dto/friend.dto";
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
	@ApiResponse({type : [Leaderboard]})
	async getLeaderboard(): Promise<Leaderboard[]> {
		const leaderboard: Leaderboard[] = await this.userService.getLeaderboard();
		return leaderboard;
	}

	@Get("wrongPassword")
	async getHello(@I18n() i18n: I18nContext) {
		return await i18n.t("tr.errors.user.wrongPassword");
	}

	@ApiResponse({ type: [Achievement] })
	@Get("/:userId/achievements")
	async getUserachievements(@Param("userId", ParseIntPipe) userId: number): Promise<Achievement[]> {
		const achievement: Achievement[] = await this.userService.getAchievemnets(userId);
		return achievement;
	}

	@ApiResponse({ type: [Friend]})
	@Get("/:userId/friends")
	async getUserFriends(@Param("userId", ParseIntPipe) userId: number): Promise<Friend[]> {
		const friends =  await this.userService.getUserFriends(userId);
		return friends
	}
	
	@ApiResponse({type : HttpException})
	@Post("/:friendId/sendFriendRequest")
	async sendFriendRequest(@Param("friendId", ParseIntPipe) friendId: number, @Req() req){
		const userId = req.user.id;
		console.log(req.user.id)
		if (userId == friendId)
		return new HttpException('BAD REQUEST', HttpStatus.BAD_REQUEST);

		
		
		const ret = await this.userService.sendFriendRequest(userId, friendId)
		return ret
	}
	
	@ApiResponse({type : HttpException})
	@Post("/:friendId/accept-friend-request")
	async acceptFriendRequest(@Param("friendId", ParseIntPipe) friendId: number, @Req() req){
		const userId = req.user.id;
		return await this.userService.acceptFriendRequest(userId, friendId)
	}

}