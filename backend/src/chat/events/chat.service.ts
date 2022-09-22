import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Member, PrismaClient } from "@prisma/client";
import { Socket } from "socket.io";
import { Message } from "../dto/message.dto";
import { User } from "../dto/user.dto";
import { UserWithSocket } from "../dto/userWithSocket.dto";

const prisma = new PrismaClient();
@Injectable()
export class ChatService {
	onlineUsers: UserWithSocket[] = [];
	generateChannelName(memebrId1: number, memebrId2: number): string {
		const channelName =
			memebrId1 < memebrId2
				? `${memebrId1.toString()}_${memebrId2.toString()}`
				: `${memebrId2.toString()}_${memebrId1.toString()}`;
		return channelName;
	}

	checkIfReceiverIsOnline(receiverId: number): boolean {
		return this.onlineUsers.some((user) => user.user.id == receiverId);
	}

	getReceiverSocket(receiverId: number): Socket {
		const user = this.onlineUsers.find((user) => user.user.id == receiverId);
		return user.socket;
	}

	addUserToOnlineUsers(newUser: User, socket: Socket) {
		const alreadyExist = this.onlineUsers.some((user) => user.user.id == newUser.id);
		if (alreadyExist) return;
		this.onlineUsers.push({
			user: newUser,
			socket: socket,
		});
	}

	async saveMessageInDatabase(message: Message) {
		try {
			const messageSaved = await prisma.message.create({
				data: {
					content: message.content,
					channel: {
						connect: {
							name: message.channelName,
						},
					},
					from: {
						connect: {
							id: message.userId,
						},
					},
				},
			});
		} catch (err) {
			throw new HttpException(err.response, err.status);
		}
	}

	async getUserData(userId: number) {
		try {
			const user = await prisma.user.findUnique({
				where: {
					id: userId,
				},
			});
			if (!user)
				throw new HttpException("There is no user with is id", HttpStatus.BAD_REQUEST);
			return user;
		} catch (err) {
			throw new HttpException(err.response, err.status);
		}
	}

	async getChannelMembers(channelId: number) {
		try {
			const chat = await prisma.channel.findUnique({
				where: {
					id: channelId,
				},
				select: {
					members: true,
				},
			});
			//! check if it's baned
			const memmbers = chat.members.filter((member) => member.status != "BANNED");
			return memmbers;
		} catch (err) {
			throw new HttpException(err.response, err.status);
		}
	}

	getsocketofMembers(memebers: Member[]): Socket[] {
		const sockets: Socket[] = [];
		memebers.forEach((member) => {
			const memberId = member.id;
			if (this.checkIfReceiverIsOnline(memberId)) {
				sockets.push(this.getReceiverSocket(memberId));
			}
		});
		return sockets;
	}
}
