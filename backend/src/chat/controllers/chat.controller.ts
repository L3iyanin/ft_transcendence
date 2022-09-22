import { Body, Controller, Get, Param, ParseIntPipe, Post, Req, UseGuards } from "@nestjs/common";
import { ApiProperty, ApiTags } from "@nestjs/swagger";
import { UserGuard } from "src/users/user.guard";
import { CreateChannelDto } from "../dto/chat.dto";
import { ChatService } from "./chat.service";

@UseGuards(UserGuard)
@ApiTags("chat-controller")
@Controller("chat")
export class ChatController {
	constructor(private readonly chatService: ChatService) {}

	// ! Dm's

	// Get all channels (dm and group)
	@ApiProperty()
	@Get() // @ To be tested
	getAllChannels(@Req() req) {
		return this.chatService.getAllChannels(req.user.id);
	}

	// Get all messages in a Channel, knowing the Channel id
	@ApiProperty()
	@Get(":channelId") // @ To be tested
	getAllMessagesInChannels(@Req() req, @Param("channelId", ParseIntPipe) channelId: number) {
		return this.chatService.getAllMessagesInChannels(req.user.id, channelId);
	}

	// Start DM with a user, if it doesn't exist, create it, if it does, return it
	@ApiProperty()
	@Post("start-dm/:userId") // @ To be tested
	startDMWithUser(@Req() req, @Param("userId", ParseIntPipe) userId: number) {
		return this.chatService.startDMWithUser(req.user.id, userId);
	}

	// create a group channel, can be private, public, or password protected
	@ApiProperty()
	@Post("create-channel") // @ To be tested + needs validation (checking if inputs are valid, and if the channel name is unique)
	createGroupChannel(
		@Req() req,
		@Body()
		preferences: CreateChannelDto
	) {
		return this.chatService.createGroupChannel(req.user.id, preferences);
	}

	// ! channel settings

	// * For DMs:

	// block user from dm, if channel doesn't exist, create it and block user
	@ApiProperty()
	@Post("block-dm/:userId") // @ To be tested
	blockUserFromDM(@Req() req, @Param("userId", ParseIntPipe) userId: number) {
		return this.chatService.blockUserFromDM(req.user.id, userId);
	}

	// unblock user from dm
	@ApiProperty()
	@Post("unblock-dm/:userId") // @ To be tested
	unblockUserFromDM(@Req() req, @Param("userId", ParseIntPipe) userId: number) {
		return this.chatService.unblockUserFromDM(req.user.id, userId);
	}

	// * For groups:

	// leave group as a user
	@ApiProperty()
	@Post("leave/:channelId") // @ To be tested
	leaveGroup(@Req() req, @Param("channelId", ParseIntPipe) channelId: number) {
		return this.chatService.leaveGroup(req.user.id, channelId);
	}

	// delete group as an admin
	@ApiProperty()
	@Post("delete/:channelId") // @ To be tested
	deleteGroup(@Req() req, @Param("channelId", ParseIntPipe) channelId: number) {
		return this.chatService.deleteGroup(req.user.id, channelId);
	}

	// add friend to group as an admin
	@ApiProperty()
	@Post("add/:userId/:channelId") // @ To be tested
	addFriendToGroup(
		@Req() req,
		@Param("channelId", ParseIntPipe) channelId: number,
		@Param("userId", ParseIntPipe) userId: number
	) {
		return this.chatService.addFriendToGroup(req.user.id, channelId, userId);
	}

	// kick out user from group as an admin
	@ApiProperty()
	@Post("kick/:userId/:channelId") // @ To be tested
	kickUserFromGroup(
		@Req() req,
		@Param("channelId", ParseIntPipe) channelId: number,
		@Param("userId", ParseIntPipe) userId: number
	) {
		return this.chatService.kickUserFromGroup(req.user.id, channelId, userId);
	}

	// block user from group as an admin for a certain amount of time
	// ! NEED to implement a way to unblock user after time is up
	@ApiProperty()
	@Post("block/:userId/:channelId") // @ To be tested
	blockUserFromGroup(
		@Req() req,
		@Param("channelId", ParseIntPipe) channelId: number,
		@Param("userId", ParseIntPipe) userId: number,
		@Body() time: 5 | 60 | 300 | 1440
	) {
		return this.chatService.blockUserFromGroup(req.user.id, channelId, userId, time);
	}

	// unblock user from group as an admin
	@ApiProperty()
	@Post("unblock/:userId/:channelId") // @ To be tested
	unblockUserFromGroup(
		@Req() req,
		@Param("channelId", ParseIntPipe) channelId: number,
		@Param("userId", ParseIntPipe) userId: number
	) {
		return this.chatService.unblockUserFromGroup(req.user.id, channelId, userId);
	}

	// mute user from group as an admin for a certain amount of time
	// ! NEED to implement a way to unmute user after time is up
	@ApiProperty()
	@Post("mute/:userId/:channelId") // @ To be tested
	muteUserFromGroup(
		@Req() req,
		@Param("channelId", ParseIntPipe) channelId: number,
		@Param("userId", ParseIntPipe) userId: number,
		@Body() time: 5 | 60 | 300 | 1440
	) {
		return this.chatService.muteUserFromGroup(req.user.id, channelId, userId, time);
	}

	// unmute user from group as an admin
	@ApiProperty()
	@Post("unmute/:userId/:channelId") // @ To be tested
	unmuteUserFromGroup(
		@Req() req,
		@Param("channelId", ParseIntPipe) channelId: number,
		@Param("userId", ParseIntPipe) userId: number
	) {
		return this.chatService.unmuteUserFromGroup(req.user.id, channelId, userId);
	}

	// change group name as an admin
	@ApiProperty()
	@Post("change-name/:channelId") // @ To be tested
	changeGroupName(
		@Req() req,
		@Param("channelId", ParseIntPipe) channelId: number,
		@Body() name: string
	) {
		return this.chatService.changeGroupName(req.user.id, channelId, name);
	}

	// make user an admin as an admin
	@ApiProperty()
	@Post("make-admin/:userId/:channelId") // @ To be tested
	makeUserAdmin(
		@Req() req,
		@Param("channelId", ParseIntPipe) channelId: number,
		@Param("userId", ParseIntPipe) userId: number
	) {
		return this.chatService.makeUserAdmin(req.user.id, channelId, userId);
	}

	// remove user as an admin as an admin, (owner can't be removed)
	@ApiProperty()
	@Post("make-member/:userId/:channelId") // @ To be tested
	makeUserMember(
		@Req() req,
		@Param("channelId", ParseIntPipe) channelId: number,
		@Param("userId", ParseIntPipe) userId: number
	) {
		return this.chatService.makeUserMember(req.user.id, channelId, userId);
	}
}
