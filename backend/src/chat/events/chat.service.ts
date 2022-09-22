import { HttpException, Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { Socket } from "socket.io";
import { Message } from "../dto/message.dto";
import { User } from "../dto/user.dto";
import { userWithSocket } from "../dto/userWithSocket.dto";

const prisma = new PrismaClient();
@Injectable()
export class ChatService {
	
	onlineUsers: userWithSocket[] = [];
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
		if (alreadyExist) 
			return;
		this.onlineUsers.push({
			user: newUser,
			socket: socket,
		});
	}
	
	async saveMessageInDatabase(message : Message){
		try {
			const messageSaved = await prisma.message.create({
				data : {
					content : message.content,
					channel :{
						connect: {
							name : message.channelName					
						}
					},
					from : {
						connect : {
							id : message.userId
						}
					}
				}
			})
		}
		catch(err){
			throw new HttpException(err.response, err.status);
		}
	}
}
