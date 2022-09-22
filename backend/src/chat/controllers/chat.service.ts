import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { generateChannelName } from "../helpers";
import { add } from "date-fns";
import { CreateChannelDto } from "../dto/chat.dto";

@Injectable()
export class ChatService {
	prisma: PrismaClient;

	constructor() {
		this.prisma = new PrismaClient();
	}

	async getAllChannels(userId: number) {
		try {
			const channels = await this.prisma.channel.findMany({
				where: {
					members: {
						some: {
							user: {
								id: userId,
							},
						},
					},
				},
				include: {
					messages: {
						orderBy: {
							createdAt: "desc",
						},
						take: 1,
					},
					members: {
						include: {
							user: true,
						},
					},
				},
			});

			channels.forEach((channel) => {
				if (channel.type === "DM") {
					channel.name = channel.members.find(
						(member) => member.user.id !== userId
					).user.fullName;
					channel.imgUrl = channel.members.find(
						(member) => member.user.id !== userId
					).user.imgUrl;
				}
			})
			return {
				channels,
				message: "channels fetched successfully",
			};
		} catch (err) {
			throw new HttpException(err, err.status);
		}
	}

	async getAllMessagesInChannels(userId: number, channelId: number) {
		try {
			const channel = await this.prisma.channel.findUnique({
				where: {
					id: channelId,
				},
				include: {
					messages: true,
					members: {
						select: {
							userId: true,
						},
					},
				},
			});
			if (channel.members.some((member) => member.userId === userId)) {
				return {
					messages: channel.messages,
					message: "Messages fetched successfully",
				};
			} else {
				throw new HttpException(
					"You are not a member of this channel",
					HttpStatus.UNAUTHORIZED
				);
			}
		} catch (err) {
			throw new HttpException(err, err.status);
		}
	}

	async startDMWithUser(userId: number, otherUserId: number) {
		try {
			const channelName = generateChannelName(userId, otherUserId);
			const channel = await this.prisma.channel.findUnique({
				where: {
					name: channelName,
				},
			});
			if (channel) {
				return {
					channel,
					message: "channel fetched successfully",
				};
			} else {
				console.log("channel not found");
				const newChannel = await this.prisma.channel.create({
					data: {
						name: channelName,
						imgUrl: `https://myanimelist.tech/api/avatar?name=${channelName}&animeName=One_Piece`, // @ To be generated
						members: {
							create: [
								{
									user: {
										connect: {
											id: userId,
										},
									},
									role: "MEMBER",
									status: "NONE",
								},
								{
									user: {
										connect: {
											id: otherUserId,
										},
									},
									role: "MEMBER",
									status: "NONE",
								},
							],
						},
						type: "DM",
					},
				});
				console.log(newChannel);
				return {
					channel: newChannel,
					message: "channel created successfully",
				};
			}
		} catch (err) {
			console.log(err);
			throw new HttpException(err, err.status);
		}
	}

	async createGroupChannel(
		userId: number,
		preferences: CreateChannelDto
	) {
		try {
			const { name, type, password } = preferences;
			if (type === "PROTECTED" && !password) {
				throw new HttpException(
					"Password is required for protected channel",
					HttpStatus.BAD_REQUEST
				);
			}
			// check if channel with same name exists
			const channel = await this.prisma.channel.findUnique({
				where: {
					name,
				},
			});
			if (channel) {
				throw new HttpException(
					"Channel with same name already exists",
					HttpStatus.BAD_REQUEST
				);
			}


			const newChannel = await this.prisma.channel.create({
				data: {
					name,
					imgUrl: `https://myanimelist.tech/api/avatar?name=${name}&animeName=one_Piece_Crews`, // @ To be generated
					members: {
						create: [
							{
								user: {
									connect: {
										id: userId,
									},
								},
								role: "OWNER",
								status: "NONE",
							},
						],
					},
					type,
					password,
				},
			});
			return {
				newChannel,
				message: "Group channel created successfully",
			};
		} catch (err) {
			console.log(err);
			throw new HttpException(err, err.status);
		}
	}

	async blockUserFromDM(userId: number, otherUserId: number) {
		try {
			const channelName = generateChannelName(userId, otherUserId);
			const channel = await this.prisma.channel.findUnique({
				where: {
					name: channelName,
				},
				include: {
					members: true,
				},
			});
			if (!channel) {
				throw new HttpException("No channel found", HttpStatus.NOT_FOUND);
			}
			if (channel.type !== "DM") {
				throw new HttpException("This is not a DM", HttpStatus.BAD_REQUEST);
			}
			const memberToBlock = channel.members.find((member) => member.userId === otherUserId);
			if (!memberToBlock) {
				throw new HttpException("User not found", HttpStatus.NOT_FOUND);
			}
			if (memberToBlock.status === "BLOCKED") {
				throw new HttpException("User already blocked", HttpStatus.BAD_REQUEST);
			}
			await this.prisma.member.update({
				where: {
					id: memberToBlock.id,
				},
				data: {
					status: "BLOCKED",
				},
			});
			return {
				message: "User blocked successfully",
			};
		} catch (err) {
			throw new HttpException(err, err.status);
		}
	}

	async unblockUserFromDM(userId: number, otherUserId: number) {
		try {
			const channelName = generateChannelName(userId, otherUserId);
			const channel = await this.prisma.channel.findUnique({
				where: {
					name: channelName,
				},
				include: {
					members: true,
				},
			});
			if (!channel) {
				throw new HttpException("No channel found", HttpStatus.NOT_FOUND);
			}
			if (channel.type !== "DM") {
				throw new HttpException("This is not a DM", HttpStatus.BAD_REQUEST);
			}
			const memberToUnblock = channel.members.find((member) => member.userId === otherUserId);
			if (!memberToUnblock) {
				throw new HttpException("User not found", HttpStatus.NOT_FOUND);
			}
			if (memberToUnblock.status !== "BLOCKED") {
				throw new HttpException("User not blocked", HttpStatus.BAD_REQUEST);
			}
			await this.prisma.member.update({
				where: {
					id: memberToUnblock.id,
				},
				data: {
					status: "NONE",
				},
			});
			return {
				message: "User unblocked successfully",
			};
		} catch (err) {
			throw new HttpException(err, err.status);
		}
	}

	async leaveGroup(userId: number, channelId: number) {
		try {
			const channel = await this.prisma.channel.findUnique({
				where: {
					id: channelId,
				},
				include: {
					members: true,
				},
			});
			if (!channel) {
				throw new HttpException("No channel found", HttpStatus.NOT_FOUND);
			}
			if (channel.type === "DM") {
				throw new HttpException("This is not a group", HttpStatus.BAD_REQUEST);
			}
			const member = channel.members.find((member) => member.userId === userId);
			if (!member) {
				throw new HttpException("User not found", HttpStatus.NOT_FOUND);
			}
			if (member.role === "OWNER") {
				// make another user owner
				const newOwner = channel.members.find((member) => member.role !== "OWNER");
				if (!newOwner) {
					// if no other user is present
					await this.prisma.channel.delete({
						where: {
							id: channelId,
						},
					});
					return {
						message: "Group deleted successfully as you were the only member",
					};
				}
				await this.prisma.member.update({
					where: {
						id: newOwner.id,
					},
					data: {
						role: "OWNER",
					},
				});
			}
			await this.prisma.member.delete({
				where: {
					id: member.id,
				},
			});
			return {
				message: "User left the group successfully",
			};
		} catch (err) {
			throw new HttpException(err, err.status);
		}
	}

	async deleteGroup(userId: number, channelId: number) {
		try {
			const channel = await this.prisma.channel.findUnique({
				where: {
					id: channelId,
				},
				include: {
					members: {
						where: {
							userId,
						},
					},
				},
			});

			if (!channel) {
				throw new HttpException("No channel found", HttpStatus.NOT_FOUND);
			}
			if (channel.type === "DM") {
				throw new HttpException("This is not a group", HttpStatus.BAD_REQUEST);
			}
			const member = channel.members.find((member) => member.userId === userId);
			if (!member) {
				throw new HttpException("User not found", HttpStatus.NOT_FOUND);
			}
			if (member.role !== "OWNER" && member.role !== "ADMIN") {
				throw new HttpException(
					"You are not allowed to delete this group",
					HttpStatus.UNAUTHORIZED
				);
			}
			await this.prisma.channel.delete({
				where: {
					id: channelId,
				},
			});
			return {
				message: "Group deleted successfully",
			};
		} catch (err) {
			throw new HttpException(err, err.status);
		}
	}

	async addFriendToGroup(userId: number, channelId: number, otherUserId: number) {
		try {
			const channel = await this.prisma.channel.findUnique({
				where: {
					id: channelId,
				},
				include: {
					members: true,
				},
			});
			if (!channel) {
				throw new HttpException("No channel found", HttpStatus.NOT_FOUND);
			}
			if (channel.type === "DM") {
				throw new HttpException("This is not a group", HttpStatus.BAD_REQUEST);
			}
			const member = channel.members.find((member) => member.userId === userId);
			if (!member) {
				throw new HttpException("User not found", HttpStatus.NOT_FOUND);
			}
			if (member.role !== "OWNER" && member.role !== "ADMIN") {
				throw new HttpException(
					"You are not allowed to add friends to this group",
					HttpStatus.BAD_REQUEST
				);
			}
			const friend = await this.prisma.user.findUnique({
				where: {
					id: otherUserId,
				},
			});
			if (!friend) {
				throw new HttpException("Friend not found", HttpStatus.NOT_FOUND);
			}
			// check if friend is already in the group
			if (channel.members.find((member) => member.userId === otherUserId)) {
				throw new HttpException("Friend is already in the group", HttpStatus.BAD_REQUEST);
			}
			await this.prisma.member.create({
				data: {
					userId: otherUserId,
					channelId,
					role: "MEMBER",
					status: "NONE",
				},
			});
			return {
				message: "Friend added to group successfully",
			};
		} catch (err) {
			throw new HttpException(err, err.status);
		}
	}

	async kickUserFromGroup(userId: number, channelId: number, otherUserId: number) {
		try {
			const channel = await this.prisma.channel.findUnique({
				where: {
					id: channelId,
				},
				include: {
					members: true,
				},
			});
			if (!channel) {
				throw new HttpException("No channel found", HttpStatus.NOT_FOUND);
			}
			if (channel.type === "DM") {
				throw new HttpException("This is not a group", HttpStatus.BAD_REQUEST);
			}
			const member = channel.members.find((member) => member.userId === userId);
			if (!member) {
				throw new HttpException("User not found", HttpStatus.NOT_FOUND);
			}
			if (member.role !== "OWNER" && member.role !== "ADMIN") {
				throw new HttpException(
					"You are not allowed to kick users from this group",
					HttpStatus.BAD_REQUEST
				);
			}
			const memberToKick = channel.members.find((member) => member.userId === otherUserId);
			if (!memberToKick) {
				throw new HttpException("User not found", HttpStatus.NOT_FOUND);
			}
			if (memberToKick.role === "OWNER") {
				throw new HttpException("You can't kick the owner", HttpStatus.BAD_REQUEST);
			}
			await this.prisma.member.delete({
				where: {
					id: memberToKick.id,
				},
			});
			return {
				message: "User kicked from group successfully",
			};
		} catch (err) {
			throw new HttpException(err, err.status);
		}
	}

	async blockUserFromGroup(
		userId: number,
		channelId: number,
		otherUserId: number,
		time: 5 | 60 | 300 | 1440
	) {
		try {
			const channel = await this.prisma.channel.findUnique({
				where: {
					id: channelId,
				},
				include: {
					members: true,
				},
			});
			if (!channel) {
				throw new HttpException("No channel found", HttpStatus.NOT_FOUND);
			}
			if (channel.type === "DM") {
				throw new HttpException("This is not a group", HttpStatus.BAD_REQUEST);
			}
			const member = channel.members.find((member) => member.userId === userId);
			if (!member) {
				throw new HttpException("User not found", HttpStatus.NOT_FOUND);
			}
			if (member.role !== "OWNER" && member.role !== "ADMIN") {
				throw new HttpException(
					"You are not allowed to block users from this group",
					HttpStatus.BAD_REQUEST
				);
			}
			const memberToBlock = channel.members.find((member) => member.userId === otherUserId);
			if (!memberToBlock) {
				throw new HttpException("User not found", HttpStatus.NOT_FOUND);
			}
			if (memberToBlock.role === "OWNER") {
				throw new HttpException("You can't block the owner", HttpStatus.BAD_REQUEST);
			}

			const date = add(new Date(), { minutes: time });
			await this.prisma.member.update({
				where: {
					id: memberToBlock.id,
				},
				data: {
					status: "BLOCKED",
					until: date,
				},
			});
			return {
				message: "User blocked from group successfully",
			};
		} catch (err) {
			throw new HttpException(err, err.status);
		}
	}

	async unblockUserFromGroup(userId: number, channelId: number, otherUserId: number) {
		try {
			const channel = await this.prisma.channel.findUnique({
				where: {
					id: channelId,
				},
				include: {
					members: true,
				},
			});
			if (!channel) {
				throw new HttpException("No channel found", HttpStatus.NOT_FOUND);
			}
			if (channel.type === "DM") {
				throw new HttpException("This is not a group", HttpStatus.BAD_REQUEST);
			}
			const member = channel.members.find((member) => member.userId === userId);
			if (!member) {
				throw new HttpException("User not found", HttpStatus.NOT_FOUND);
			}
			if (member.role !== "OWNER" && member.role !== "ADMIN") {
				throw new HttpException(
					"You are not allowed to unblock users from this group",
					HttpStatus.BAD_REQUEST
				);
			}
			const memberToUnblock = channel.members.find((member) => member.userId === otherUserId);
			if (!memberToUnblock) {
				throw new HttpException("User not found", HttpStatus.NOT_FOUND);
			}
			if (memberToUnblock.role === "OWNER") {
				throw new HttpException("You can't unblock the owner", HttpStatus.BAD_REQUEST);
			}
			await this.prisma.member.update({
				where: {
					id: memberToUnblock.id,
				},
				data: {
					status: "NONE",
					until: null,
				},
			});
			return {
				message: "User unblocked from group successfully",
			};
		} catch (err) {
			throw new HttpException(err, err.status);
		}
	}

	async muteUserFromGroup(
		userId: number,
		channelId: number,
		otherUserId: number,
		time: 5 | 60 | 300 | 1440
	) {
		try {
			const channel = await this.prisma.channel.findUnique({
				where: {
					id: channelId,
				},
				include: {
					members: true,
				},
			});
			if (!channel) {
				throw new HttpException("No channel found", HttpStatus.NOT_FOUND);
			}
			if (channel.type === "DM") {
				throw new HttpException("This is not a group", HttpStatus.BAD_REQUEST);
			}
			const member = channel.members.find((member) => member.userId === userId);
			if (!member) {
				throw new HttpException("User not found", HttpStatus.NOT_FOUND);
			}
			if (member.role !== "OWNER" && member.role !== "ADMIN") {
				throw new HttpException(
					"You are not allowed to mute users from this group",
					HttpStatus.BAD_REQUEST
				);
			}
			const memberToMute = channel.members.find((member) => member.userId === otherUserId);
			if (!memberToMute) {
				throw new HttpException("User not found", HttpStatus.NOT_FOUND);
			}
			if (memberToMute.role === "OWNER") {
				throw new HttpException("You can't mute the owner", HttpStatus.BAD_REQUEST);
			}
			const date = add(new Date(), { minutes: time });
			await this.prisma.member.update({
				where: {
					id: memberToMute.id,
				},
				data: {
					status: "MUTED",
					until: date,
				},
			});
			return {
				message: "User muted from group successfully",
			};
		} catch (err) {
			throw new HttpException(err, err.status);
		}
	}

	async unmuteUserFromGroup(userId: number, channelId: number, otherUserId: number) {
		try {
			const channel = await this.prisma.channel.findUnique({
				where: {
					id: channelId,
				},
				include: {
					members: true,
				},
			});
			if (!channel) {
				throw new HttpException("No channel found", HttpStatus.NOT_FOUND);
			}
			if (channel.type === "DM") {
				throw new HttpException("This is not a group", HttpStatus.BAD_REQUEST);
			}
			const member = channel.members.find((member) => member.userId === userId);
			if (!member) {
				throw new HttpException("User not found", HttpStatus.NOT_FOUND);
			}
			if (member.role !== "OWNER" && member.role !== "ADMIN") {
				throw new HttpException(
					"You are not allowed to unmute users from this group",
					HttpStatus.BAD_REQUEST
				);
			}
			const memberToUnmute = channel.members.find((member) => member.userId === otherUserId);
			if (!memberToUnmute) {
				throw new HttpException("User not found", HttpStatus.NOT_FOUND);
			}
			if (memberToUnmute.role === "OWNER") {
				throw new HttpException("You can't unmute the owner", HttpStatus.BAD_REQUEST);
			}
			await this.prisma.member.update({
				where: {
					id: memberToUnmute.id,
				},
				data: {
					status: "NONE",
					until: null,
				},
			});
			return {
				message: "User unmuted from group successfully",
			};
		} catch (err) {
			throw new HttpException(err, err.status);
		}
	}

	async changeGroupName(userId: number, channelId: number, name: string) {
		try {
			const channel = await this.prisma.channel.findUnique({
				where: {
					id: channelId,
				},
				include: {
					members: true,
				},
			});
			if (!channel) {
				throw new HttpException("No channel found", HttpStatus.NOT_FOUND);
			}
			if (channel.type === "DM") {
				throw new HttpException("This is not a group", HttpStatus.BAD_REQUEST);
			}
			const member = channel.members.find((member) => member.userId === userId);
			if (!member) {
				throw new HttpException("User not found", HttpStatus.NOT_FOUND);
			}
			if (member.role !== "OWNER" && member.role !== "ADMIN") {
				throw new HttpException(
					"You are not allowed to change the name of this group",
					HttpStatus.BAD_REQUEST
				);
			}
			await this.prisma.channel.update({
				where: {
					id: channelId,
				},
				data: {
					name,
				},
			});
			return {
				message: "Group name changed successfully",
			};
		} catch (err) {
			throw new HttpException(err, err.status);
		}
	}

	async makeUserAdmin(userId: number, channelId: number, otherUserId: number) {
		try {
			const channel = await this.prisma.channel.findUnique({
				where: {
					id: channelId,
				},
				include: {
					members: true,
				},
			});
			if (!channel) {
				throw new HttpException("No channel found", HttpStatus.NOT_FOUND);
			}
			if (channel.type === "DM") {
				throw new HttpException("This is not a group", HttpStatus.BAD_REQUEST);
			}
			const member = channel.members.find((member) => member.userId === userId);
			if (!member) {
				throw new HttpException("User not found", HttpStatus.NOT_FOUND);
			}
			if (member.role === "MEMBER") {
				throw new HttpException(
					"You are not allowed to make users admin in this group",
					HttpStatus.BAD_REQUEST
				);
			}
			const memberToMakeAdmin = channel.members.find(
				(member) => member.userId === otherUserId
			);
			if (!memberToMakeAdmin) {
				throw new HttpException("User not found", HttpStatus.NOT_FOUND);
			}
			if (memberToMakeAdmin.role === "OWNER") {
				throw new HttpException(
					"You can't make the owner an admin",
					HttpStatus.BAD_REQUEST
				);
			}
			await this.prisma.member.update({
				where: {
					id: memberToMakeAdmin.id,
				},
				data: {
					role: "ADMIN",
				},
			});
			return {
				message: "User made admin successfully",
			};
		} catch (err) {
			throw new HttpException(err, err.status);
		}
	}

	async makeUserMember(userId: number, channelId: number, otherUserId: number) {
		try {
			const channel = await this.prisma.channel.findUnique({
				where: {
					id: channelId,
				},
				include: {
					members: true,
				},
			});
			if (!channel) {
				throw new HttpException("No channel found", HttpStatus.NOT_FOUND);
			}
			if (channel.type === "DM") {
				throw new HttpException("This is not a group", HttpStatus.BAD_REQUEST);
			}
			const member = channel.members.find((member) => member.userId === userId);
			if (!member) {
				throw new HttpException("User not found", HttpStatus.NOT_FOUND);
			}
			if (member.role === "MEMBER") {
				throw new HttpException(
					"You are not allowed to make users member in this group",
					HttpStatus.BAD_REQUEST
				);
			}
			const memberToMakeMember = channel.members.find(
				(member) => member.userId === otherUserId
			);
			if (!memberToMakeMember) {
				throw new HttpException("User not found", HttpStatus.NOT_FOUND);
			}
			if (memberToMakeMember.role === "OWNER") {
				throw new HttpException(
					"You can't make the owner a member",
					HttpStatus.BAD_REQUEST
				);
			}
			await this.prisma.member.update({
				where: {
					id: memberToMakeMember.id,
				},
				data: {
					role: "MEMBER",
				},
			});
			return {
				message: "User made member successfully",
			};
		} catch (err) {
			throw new HttpException(err, err.status);
		}
	}
} // ? End of ChatService
