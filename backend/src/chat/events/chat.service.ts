import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Member, PrismaClient } from "@prisma/client";
import { Socket } from "socket.io";
import { OnlineUsersService } from "src/online-users/online-users.service";
import { Message } from "../dto/chat.dto";
import { generateChannelName } from "../helpers/helpers";

@Injectable()
export class ChatService {
	prisma: PrismaClient;

	constructor(private readonly onlineUsersService: OnlineUsersService) {
		this.prisma = new PrismaClient();
	}

	//? ========================================MESSAGE EVENT=============================================
	async handleMessage(client: Socket, payload: Message) {
		try {
			await this.unmuteAndUnbanMembersAfterTime();
			let response, channelName;
			if (payload.isDm == true) {
				//? DM
				payload.receiverId = await this.getReceiverId(payload);
				const isBlock: boolean = await this.ChatIsBlocked(payload);
				if (isBlock) return;
				channelName = generateChannelName(payload.userId, payload.receiverId);
				const receiverIsOnline = this.onlineUsersService.checkIfReceiverIsOnline(payload.receiverId);
				if (receiverIsOnline) {
					const receiverSocket: Socket[] = this.onlineUsersService.getUserSockets(payload.receiverId);
					receiverSocket.forEach((receiver) => receiver.join(channelName));
				}
				client.join(channelName);
				response = await this.generateResponse(payload);
			} else {
				//? GROUP
				//? check status of the sender
				const channel = await this.prisma.channel.findUnique({
					where: {
						id: payload.channelId,
					},
					include: {
						members: true,
					},
				});
				const member: Member = channel.members.find(
					(member) => (member.userId === payload.userId)
				);
				if (member.status != "NONE") {
					response = this.generateResponse(payload, member.status, member.until);
					return response
				}
				channelName = payload.channelName;
				const members = await this.getChannelMembers(payload.channelId);
				members.forEach((member) => {
					if (this.onlineUsersService.checkIfReceiverIsOnline(member.userId)) {
						const memberSockets: Socket[] = this.onlineUsersService.getUserSockets(member.userId);
						if (member.status != "BLOCKED")
							memberSockets.forEach((socket) => socket.join(payload.channelName));
						else
							memberSockets.forEach((socket) => socket.leave(payload.channelName));
					}
				});
				response = await this.generateResponse(payload);
			}
			await this.saveMessageInDatabase(payload);
			return {
				response: response,
				channelName: channelName,
			};
		} catch (err) {
			throw new HttpException(err.response, err.status);
		}
	}

	//? __________________________________________________________________________________________________

	//? ========================================HELPER FUNCTION===========================================

	async getReceiverId(message: Message): Promise<number> {
		try {
			const channel = await this.prisma.channel.findUnique({
				include: {
					members: true,
				},
				where: {
					id: message.channelId,
				},
			});
			const memberReceiver = channel.members.find(
				(member) => member.userId != message.userId
			);
			return memberReceiver.userId;
		} catch (err) {
			throw new HttpException(err, err.status);
		}
	}

	async saveMessageInDatabase(message: Message) {
		try {
			const channel = await this.prisma.channel.findUnique({
				include: {
					members: true,
				},
				where: {
					id: message.channelId,
				},
			});
			const memberSender = channel.members.find((member) => member.userId == message.userId); //? get memberId by userId

			const messageSaved = await this.prisma.message.create({
				data: {
					content: message.content,
					channel: {
						connect: {
							id: message.channelId,
						},
					},
					from: {
						connect: {
							id: memberSender.id,
						},
					},
				},
			});

		} catch (err) {
			throw new HttpException(err.response, err.status);
		}
	}

	async generateResponse(payload: Message, status = "NONE", until = null) {
		let response: any;
		try {
			if (status != "NONE") {
				//? IF IT'S BLOCKED OR MUTED
				response = {
					error: `You can't send the message because you still ${status}`,
					until: until,
					status: status,
					channelId: payload.channelId,
				};
				return response;
			}
			const channel = await this.prisma.channel.findUnique({
				include: {
					members: true,
				},
				where: {
					id: payload.channelId,
				},
			});
			const memberSender = channel.members.find((member) => member.userId == payload.userId); //? get memberId by userId

			const member = await this.prisma.member.findUnique({
				where: {
					id: memberSender.id,
				},
				include: {
					user: true,
				},
			});
			if (!member)
				throw new HttpException("There is no user with is ID", HttpStatus.BAD_REQUEST);

			if (payload.isDm) {
				response = {
					from: member,
					content: payload.content,
					channelId: payload.channelId,
					isDm: true,
				};
			} else {
				response = {
					from: member,
					content: payload.content,
					isDm: false,
					channelId: payload.channelId,
					channelName: payload.channelName,
				};
			}
			return response;
		} catch (err) {
			throw new HttpException(err.response, err.status);
		}
	}

	async unmuteAndUnbanMembersAfterTime() {
		try {
			await this.prisma.member.updateMany({
				where: {
					until: {
						lt: new Date(),
					},
				},
				data: {
					status: "NONE",
					until: null,
				},
			});
		} catch (err) {
			throw new HttpException(err.response, err.status);
		}
	}

	async getChannelMembers(channelId: number) {
		try {
			const chat = await this.prisma.channel.findUnique({
				where: {
					id: channelId,
				},
				select: {
					members: true,
				},
			});
			// const members = chat.members.filter((member) => member.status != "BLOCKED");
			return chat.members;
		} catch (err) {
			throw new HttpException(err.response, err.status);
		}
	}

	async ChatIsBlocked(payload: Message): Promise<boolean> {
		try {
			const channel = await this.prisma.channel.findUnique({
				where: {
					id: payload.channelId,
				},
				include: {
					members: true,
				},
			});
			if (channel.members[0].status == "BLOCKED" || channel.members[1].status == "BLOCKED")
				return true;
			return false;
		} catch (err) {
			throw new HttpException(err, err.status);
		}
	}
	//? __________________________________________________________________________________________________
}
