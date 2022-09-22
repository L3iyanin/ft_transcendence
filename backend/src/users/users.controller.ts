import {
	Body,
	Controller,
	Get,
	HttpException,
	HttpStatus,
	Param,
	ParseFilePipe,
	ParseFilePipeBuilder,
	ParseIntPipe,
	Post,
	Put,
	Req,
	UploadedFile,
	UseGuards,
	UseInterceptors,
	UsePipes,
} from "@nestjs/common";
import { UserGuard } from "./user.guard";
import { editFileName, UsersService } from "./users.service";
import { UserInfo } from "./dto/userInfo.dto";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { I18n, I18nContext } from "nestjs-i18n";
import { Achievement } from "./dto/achievement.dto";
import { userInLeaderboard } from "./dto/userInLeaderboard";
import { Friend } from "./dto/friend.dto";
import { FriendRequest } from "./dto/friendRequest.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { Form } from "./dto/updateProfile.dto";
import { diskStorage } from "multer";
import { PostResponce } from "./dto/postResponce.dto";


@UseGuards(UserGuard)
@ApiTags("users")
@Controller("users")
export class UsersController {
	constructor(private readonly userService: UsersService) {}

	@ApiResponse({ type: UserInfo })
	@Get("/my-info")
	async getCurrentUserInfo(@Req() req): Promise<UserInfo> {
		const currentUserID = req.user.id;
		return await this.userService.getUserInfoById(currentUserID, currentUserID);
	}

	@ApiResponse({ type: UserInfo })
	@Get("/:userId/info")
	async getUserInfo(@Req() req, @Param("userId", ParseIntPipe) userId: number): Promise<UserInfo> {
		const currentUserID = req.user.id;
		return await this.userService.getUserInfoById(userId, currentUserID);
	}

	@Get("leaderboard")
	@ApiResponse({ type: [userInLeaderboard] })
	async getLeaderboard(): Promise<userInLeaderboard[]> {
		return await this.userService.getLeaderboard();
	}

	@Get("wrong-password")
	async getHello(@I18n() i18n: I18nContext) {
		return await i18n.t("tr.errors.user.wrongPassword");
	}

	@ApiResponse({ type: [Achievement] })
	@Get("/:userId/achievements")
	async getUserachievements(
		@Param("userId", ParseIntPipe) userId: number
	): Promise<Achievement[]> {
		const achievements: Achievement[] = await this.userService.getAchievemnets(userId);
		return achievements;
	}

	@ApiResponse({ type: [Friend] })
	@Get("/:userId/friends")
	async getUserFriends(@Param("userId", ParseIntPipe) userId: number): Promise<Friend[]> {
		return await this.userService.getUserFriends(userId);
	}

	@ApiResponse({ type: PostResponce })
	@Post("/:friendId/send-friend-request")
	async sendFriendRequest(
		@Param("friendId", ParseIntPipe) friendId: number,
		@Req() req
	): Promise<PostResponce> {
		const currentUserID = req.user.id;
		if (currentUserID == friendId) return new HttpException("BAD REQUEST", HttpStatus.BAD_REQUEST);
		return await this.userService.sendFriendRequest(currentUserID, friendId);
	}

	@ApiResponse({ type: PostResponce })
	@Post("/:friendId/accept-friend-request")
	async acceptFriendRequest(
		@Param("friendId", ParseIntPipe) friendId: number,
		@Req() req
	): Promise<PostResponce> {
		const currentUserID = req.user.id;
		return await this.userService.acceptFriendRequest(currentUserID, friendId);
	}

	@ApiResponse({ type: [FriendRequest] })
	@Get("/:userId/friend-requests")
	async geFriendRequests(
		@Param("userId", ParseIntPipe) userId: number,
		@Req() req
	): Promise<FriendRequest[]> {
		return await this.userService.getFriendRequests(userId);
	}

	@ApiResponse({ type: PostResponce })
	@Post("/:friendId/discard-friend-request")
	async discardFriendRequest(
		@Param("friendId", ParseIntPipe) friendId: number,
		@Req() req
	): Promise<PostResponce> {
		const currentUserID = req.user.id;
		return await this.userService.discardFriendRequest(currentUserID, friendId);
	}

	@ApiResponse({ type: PostResponce })
	@Post("/update-profile-image")
	@UseInterceptors(
		FileInterceptor("file", {
			storage: diskStorage({
				filename: editFileName,
				destination: "./public",
			}),
		})
	)
	async updatepUserProfileImage(
		@UploadedFile(
			new ParseFilePipeBuilder()
				.addFileTypeValidator({
					fileType: new RegExp(".(png|jpg|jpeg|webp)"),
				})
				.build({
					errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
				})
		)
		file: Express.Multer.File,
		@Req() req
	): Promise<PostResponce> {
		const currentUserID = req.user.id;
		if (file) return await this.userService.updateImageProfile(file, currentUserID, req.user.username);
	}

	@ApiResponse({ type: PostResponce })
	@Post("/update-profile-info")
	async updateProfileInfo(@Req() req, @Body() form: Form): Promise<PostResponce> {
		const currentUserID: number = req.user.id;
		if (form.name && !form.twoFF)
			return await this.userService.updateUserName(form.name, currentUserID);
		if (form.twoFF && !form.name) return await this.userService.update2ff(currentUserID);
		if (form.name && form.twoFF) {
			await this.userService.update2ff(currentUserID);
			await this.userService.updateUserName(form.name, currentUserID);
			return {
				message: "Profile has be updated",
			};
		}
	}
}
