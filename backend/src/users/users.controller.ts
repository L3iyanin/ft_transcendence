import { Body, Controller, Get, HttpException, HttpStatus, Param, ParseFilePipe, ParseFilePipeBuilder, ParseIntPipe, Post, Put, Req, UploadedFile, UseGuards, UseInterceptors, UsePipes} from "@nestjs/common";
import { UserGuard } from "./user.guard";
import { UsersService } from "./users.service";
import { UserInfo } from "./dto/userInfo.dto";
import { ApiProperty, ApiResponse, ApiTags } from "@nestjs/swagger";
import { I18n, I18nContext } from "nestjs-i18n";
import { Achievement } from "./dto/achievement.dto";
import { userInLeaderboard } from "./dto/userInLeaderboard";
import { Friend } from "./dto/friend.dto";
import { FriendRequest } from "./dto/friendRequest.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { Form } from "./dto/updateProfile.dto";

@UseGuards(UserGuard)
@ApiTags("users")
@Controller("users")
export class UsersController {
	constructor(private readonly userService: UsersService) {}

	@ApiResponse({ type: UserInfo })
	@Get("/my-info")
	async getCurrentUserInfo(@Req() req): Promise<UserInfo> {
		const id = req.user.id;
		const userInfo: UserInfo = await this.userService.getUserInfoById(id);
		return userInfo;
	}

	@ApiResponse({ type: UserInfo })
	@Get("/:userId/info")
	async getUserInfo(@Param("userId", ParseIntPipe) userId: number): Promise<UserInfo> {
		const userInfo: UserInfo = await this.userService.getUserInfoById(userId);
		return userInfo;
	}

	@Get("leaderboard")
	@ApiResponse({type : [userInLeaderboard]})
	async getLeaderboard(): Promise<userInLeaderboard[]> {
		const leaderboard: userInLeaderboard[] = await this.userService.getLeaderboard();
		return leaderboard;
	}

	@Get("wrong-password")
	async getHello(@I18n() i18n: I18nContext) {
		return await i18n.t("tr.errors.user.wrongPassword");
	}

	@ApiResponse({ type: [Achievement] })
	@Get("/:userId/achievements")
	async getUserachievements(@Param("userId", ParseIntPipe) userId: number): Promise<Achievement[]> {
		const achievements: Achievement[] = await this.userService.getAchievemnets(userId);
		return achievements;
	}

	@ApiResponse({ type: [Friend]})
	@Get("/:userId/friends")
	async getUserFriends(@Param("userId", ParseIntPipe) userId: number): Promise<Friend[]> {
		const friends =  await this.userService.getUserFriends(userId);
		return friends
	}

	@Post("/:friendId/send-friend-request")
	async sendFriendRequest(@Param("friendId", ParseIntPipe) friendId: number, @Req() req){
		const userId = req.user.id;
		if (userId == friendId)
			return new HttpException('BAD REQUEST', HttpStatus.BAD_REQUEST);
		const ret = await this.userService.sendFriendRequest(userId, friendId)
		return ret
	}

	@Post("/:friendId/accept-friend-request")
	async acceptFriendRequest(@Param("friendId", ParseIntPipe) friendId: number, @Req() req){
		const userId = req.user.id;
		const ret  = await this.userService.acceptFriendRequest(userId, friendId)
		return ret
	}

	@ApiResponse({type : [FriendRequest]})
	@Get("/:userId/friend-requests")
	async geFriendRequests(@Param("userId", ParseIntPipe) userId: number, @Req() req){
		const friendRequests = await this.userService.getFriendRequests(userId)
		return friendRequests;
	}

	@ApiResponse({type : HttpException})
	@Post("/:friendId/discard-friend-request")
	async discardFriendRequest(@Param("friendId", ParseIntPipe) friendId: number, @Req() req){
		const userId = req.user.id;
		const ret  = await this.userService.discardFriendRequest(userId, friendId)
		return ret
	}


	// @ApiResponse({type : HttpException})
	@Post("/update-profile")
	@UseInterceptors(FileInterceptor('file'))
	async updatepUserProfile(@UploadedFile(
		new ParseFilePipeBuilder()
		  .addFileTypeValidator({
			fileType : new RegExp("\.(png|jpg|jpeg|webp)")
		  })

		  .build({
			errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
		  })
	  ,) file: Express.Multer.File, @Req() req, @Body() form : Form){
			// if (file)
			// 	this.userService.updateImageProfile
			// if (req.body.name)
			// 	this.userService.updateUserName
			// if (req.body.twoFF)
			// 	this.userService.update2ff
		return new HttpException("PROFILE REQUEST HAS BEEN UPDATED", HttpStatus.CREATED);
	}
}
