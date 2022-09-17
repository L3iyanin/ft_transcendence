import { Body, Controller, Get, HttpException, HttpStatus, Param, ParseFilePipe, ParseFilePipeBuilder, ParseIntPipe, Post, Put, Req, UploadedFile, UseGuards, UseInterceptors, UsePipes} from "@nestjs/common";
import { UserGuard } from "./user.guard";
import { UsersService } from "./users.service";
import { UserInfo } from "./dto/userInfo.dto";
import { ApiProperty, ApiResponse, ApiTags } from "@nestjs/swagger";
import { I18n, I18nContext } from "nestjs-i18n";
import { Achievement } from "./dto/achievement.dto";
import { Leaderboard } from "./dto/leaderboard.dto";
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
	@Get("/:userId/info")
	async getUserInfo(@Param("userId", ParseIntPipe) userId: number): Promise<UserInfo> {
		const userInfo: UserInfo = await this.userService.getUserInfoById(userId);
		if (!userInfo)
			throw new HttpException("INTERNAL SERVER ERROR", HttpStatus.INTERNAL_SERVER_ERROR);

		return userInfo;
	}

	@Get("leaderboard")
	@ApiResponse({type : [Leaderboard]})
	async getLeaderboard(): Promise<Leaderboard[]> {
		const leaderboard: Leaderboard[] = await this.userService.getLeaderboard();
		if (!leaderboard)
			throw new HttpException("INTERNAL SERVER ERROR", HttpStatus.INTERNAL_SERVER_ERROR);

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
		if (!achievement)
			throw new HttpException("INTERNAL SERVER ERROR", HttpStatus.INTERNAL_SERVER_ERROR);
		return achievement;
	}

	@ApiResponse({ type: [Friend]})
	@Get("/:userId/friends")
	async getUserFriends(@Param("userId", ParseIntPipe) userId: number): Promise<Friend[]> {
		const friends =  await this.userService.getUserFriends(userId);
		if (!friends)
			throw new HttpException("INTERNAL SERVER ERROR", HttpStatus.INTERNAL_SERVER_ERROR);
		return friends
	}
	
	@ApiResponse({type : HttpException})
	@Post("/:friendId/sendFriendRequest")
	async sendFriendRequest(@Param("friendId", ParseIntPipe) friendId: number, @Req() req){
		const userId = req.user.id;
		console.log(req.user.id)
		if (userId == friendId)
			return new HttpException('BAD REQUEST', HttpStatus.BAD_REQUEST);
		const httpExceptionreturn = await this.userService.sendFriendRequest(userId, friendId)
		return httpExceptionreturn
	}
	
	@ApiResponse({type : HttpException})
	@Post("/:friendId/acceptFriendRequest")
	async acceptFriendRequest(@Param("friendId", ParseIntPipe) friendId: number, @Req() req){
		const userId = req.user.id;
		const httpExceptionreturn  = await this.userService.acceptFriendRequest(userId, friendId)
		return httpExceptionreturn
	}

	@ApiResponse({type : [FriendRequest]})
	@Get("/:userId/friendRequests")
	async geFriendRequests(@Param("userId", ParseIntPipe) userId: number, @Req() req){
		const friendRequests = await this.userService.getFriendRequests(userId)
		return friendRequests;
	}

	@ApiResponse({type : HttpException})
	@Post("/:friendId/discardFriendRequest")
	async discardFriendRequest(@Param("friendId", ParseIntPipe) friendId: number, @Req() req){
		const userId = req.user.id;
		const httpExceptionreturn  = await this.userService.discardFriendRequest(userId, friendId)
		return httpExceptionreturn
	}
	

	@ApiResponse({type : HttpException})
	@Post("/updateProfile")
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