import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Member, PrismaClient } from "@prisma/client";
import { Socket } from "socket.io";
import { Message } from "../dto/message.dto";
import { User } from "../dto/user.dto";
import { UserWithSocket } from "../dto/userWithSocket.dto";
import { generateChannelName } from "../helpers";

@Injectable()
export class ChatService {
	onlineUsers: UserWithSocket[];
	prisma :PrismaClient;

	constructor(){
		this.onlineUsers = [];
		this.prisma = new PrismaClient()
	}

	//? ========================================CONNECT USER EVENT========================================
	addConnectedUser(client: Socket, newUser : User){
		const alreadyExist = this.onlineUsers.some((user) => user.socket.id == user.socket.id); //! corretc this for one user in multiple tab
		if (!alreadyExist){

			this.onlineUsers.push({
				user: newUser,
				socket: client,
			});
		}
		const users = []
		this.onlineUsers.map( user => {
			users.push({
				user : user.user
			})
		})
		// console.log("connect User")
		// console.table(newUser)
		// console.log(newUser.id)
		// console.log("--------------------------------------------")
		return users

	}
	//? __________________________________________________________________________________________________

	//? ========================================MESSAGE EVENT=============================================
	async handleMessage(client: Socket, payload: Message) {
		try{

			let response, channelName
			if (payload.isDm == true){
				payload.receiverId = await this.getReceiverId(payload)
				console.log("receiverId : ", payload.receiverId)
				channelName = generateChannelName(payload.userId, payload.receiverId);
				const receiverIsOnline =  this.checkIfReceiverIsOnline(payload.receiverId)
				if (receiverIsOnline){
					const receiverSocket: Socket[] = this.getReceiversSocket(payload.receiverId);
					receiverSocket.forEach(receiver => receiver.join(channelName))
					// receiverSocket.join(channelName);
				}
				client.join(channelName);
				response = await this.generateResponse(payload)
			}
			else{
				channelName = payload.channelName
				const members = await this.getChannelMembers(payload.channelId)
				// const sockets: Socket[] = []
				members.forEach((member) => {
					if (this.checkIfReceiverIsOnline(member.userId)) {
						// sockets.push(this.getReceiverSocket(member.userId));
						const memberSockets : Socket[] = this.getReceiversSocket(member.userId)
						memberSockets.forEach(socket => socket.join(payload.channelName))
					}
				});
				// sockets.forEach(socket => console.log(socket.id))
				// sockets.forEach(socket => socket.join(payload.channelName))
				response = await this.generateResponse(payload)
			}
			await this.saveMessageInDatabase(payload)
			return {
				response : response,
				channelName : channelName
			}
		}
		catch(err){
			throw new HttpException(err.response, err.status);
		}
	}

	//? __________________________________________________________________________________________________

	//? ========================================HELPER FUNCTION===========================================

	async getReceiverId(message : Message) : Promise<number>{
		try{
			const channel = await this.prisma.channel.findUnique({
				include : {
					members : true
				},
				where : {
					id : message.channelId
				}
			})
			const memberReceiver =  channel.members.find(member => member.userId != message.userId)
			return memberReceiver.userId
		}
		catch(err){
			throw new HttpException(err, err.status)
		}
	}

	async saveMessageInDatabase(message: Message) {
		try {
			const channel = await this.prisma.channel.findUnique({
				include : {
					members : true
				},
				where : {
					id : message.channelId
				}
			})
			const memberSender =  channel.members.find(member => member.userId == message.userId) //? get memberId by userId

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
							id: memberSender.id
						},
					},
				},
			});

			console.log("+++++++++++++++++++++++++++++++")
		} catch (err) {
			throw new HttpException(err.response, err.status);
		}
	}

	async generateResponse(payload : Message){
		let response;
		try {
			const channel = await this.prisma.channel.findUnique({
				include : {
					members : true
				},
				where : {
					id : payload.channelId
				}
			})
			const memberSender =  channel.members.find(member => member.userId == payload.userId) //? get memberId by userId

			const member = await this.prisma.member.findUnique({
				where: {
					id : memberSender.id
				},
				include : {
					user : true
				}
			});
			if (!member)
				throw new HttpException("There is no user with is ID", HttpStatus.BAD_REQUEST);

			if (payload.isDm){
				response = {
					from : member,
					content : payload.content,
					channelId : payload.channelId,
					isDm : true
				}
			}
			else{
				response = {
					from : member,
					content : payload.content,
					isDm : false,
					channelId : payload.channelId,
					channelName : payload.channelName
				}
			}
			return response
	}
		catch (err) {
			throw new HttpException(err.response, err.status);
		}
	}

	checkIfReceiverIsOnline(receiverId: number): boolean {
		return this.onlineUsers.some((user) => user.user.id == receiverId);
	}

	getReceiversSocket(receiverId: number): Socket[] {
		const sockets: Socket[] = [];
		this.onlineUsers.forEach((user) => {
			if (user.user.id == receiverId)
				sockets.push(user.socket)
	});
		return sockets;
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
			const members = chat.members.filter((member) => member.status != "BANNED");
			return members;
		} catch (err) {
			throw new HttpException(err.response, err.status);
		}
	}
	//? __________________________________________________________________________________________________
}
