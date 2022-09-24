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
		const alreadyExist = this.onlineUsers.some((user) => user.user.id == newUser.id); //! corretc this for one user in multiple tab 
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
		console.log("connect User")
		console.table(newUser)
		console.log(newUser.id)
		console.log("--------------------------------------------")
		return users

	}
	//? __________________________________________________________________________________________________
	
	//? ========================================MESSAGE EVENT=============================================
	async handleMessage(client: Socket, payload: Message) {
		try{

			let response, channelName
			if (payload.isDm == true){
				payload.receiverId = await this.getReceiverId(payload)
				channelName = generateChannelName(payload.userId, payload.receiverId);
				const receiverIsOnline =  this.checkIfReceiverIsOnline(payload.receiverId)
				if (receiverIsOnline){
					const receiverSocket: Socket = this.getReceiverSocket(payload.receiverId);
					receiverSocket.join(channelName);
				}
				client.join(channelName);
				response = await this.generateResponse(payload)
			}
			else{
				channelName = payload.channelName
				const members = await this.getChannelMembers(payload.channelId)
				const sockets: Socket[] = [];
				members.forEach((member) => {
					if (this.checkIfReceiverIsOnline(member.userId)) {
						sockets.push(this.getReceiverSocket(member.userId));
					}
				});
				sockets.forEach(socket => console.log(socket.id))
				sockets.forEach(socket => socket.join(payload.channelName))
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
	async getReceiverId(message : Message) : number{
		try{
			const channel = await this.prisma.channel.findUnique({
				include : {
					members : true
				},
				where : {
					name : message.channelName
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
					name : message.channelName
				}
			})
			const memberSender =  channel.members.find(member => member.userId == message.userId) //? get memberId by userId
			const messageSaved = await this.prisma.message.create({
				data: {
					content: message.content,
					channel: {
						connect: {
							name: message.channelName,
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
			const user = await this.prisma.user.findUnique({
				where: {
					id: payload.userId,
				},
			});
			if (!user)
				throw new HttpException("There is no user with is ID", HttpStatus.BAD_REQUEST);
			
			if (payload.isDm){
				response = {
					sender : user,
					content : payload.content,
					isDm : true
				}
			}
			else{
				response = {
					sender : user,
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
	
	getReceiverSocket(receiverId: number): Socket {
		const user = this.onlineUsers.find((user) => user.user.id == receiverId);
		return user.socket;
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
