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
		this.addUserToOnlineUsers(newUser, client);
		const users = this.getAllonlineUsers()
		return users
	}
	//? __________________________________________________________________________________________________
	
	//? ========================================MESSAGE EVENT=============================================
	async handleMessage(client: Socket, payload: Message) {
		try{

			let response, channelName
			if (payload.isDm == true){
				channelName = generateChannelName(payload.userId, payload.receiverId);
				response = this.insertUsersInRoom(client, payload, channelName)
				await this.saveMessageInDatabase(payload) //! you need to test this function !!!
			}
			else{
				const members = await this.getChannelMembers(payload.channelId)
				const sockets  : Socket[] = this.getsocketofMembers(members)
				sockets.forEach(socket => socket.join(payload.channelName))
				response = this.generateResponse(payload)
				await this.saveMessageInDatabase(payload)
			}
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

	async saveMessageInDatabase(message: Message) {
		try {
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
							id: message.userId,
						},
					},
				},
			});
		} catch (err) {
			throw new HttpException(err.response, err.status);
		}
	}

	async generateResponse(payload : Message){
		let response;

		if (payload.isDm){
			response = {
				sender : await this.getUserData(payload.userId),
				content : payload.content,
				isDm : true
			}
		}
		else{
			response = {
				sender : await this.getUserData(payload.userId),
				content : payload.content,
				isDm : false,
				channelId : payload.channelId,
				channelName : payload.channelName			
			}
		}
		return response
	}


	addUserToOnlineUsers(newUser: User, socket: Socket) {
		const alreadyExist = this.onlineUsers.some((user) => user.user.id == newUser.id);
		if (alreadyExist) return;
		this.onlineUsers.push({
			user: newUser,
			socket: socket,
		});
	}

	getAllonlineUsers(){
		const users = []
		this.onlineUsers.map( user => {
			users.push({
				user : user.user
			})
		})
	}
	checkIfReceiverIsOnline(receiverId: number): boolean {
		return this.onlineUsers.some((user) => user.user.id == receiverId);
	}
	
	getReceiverSocket(receiverId: number): Socket {
		const user = this.onlineUsers.find((user) => user.user.id == receiverId);
		return user.socket;
	}

	async getUserData(userId: number) {
		try {
			const user = await this.prisma.user.findUnique({
				where: {
					id: userId,
				},
			});
			if (!user)
				throw new HttpException("There is no user with is ID", HttpStatus.BAD_REQUEST);
			return user;
		} catch (err) {
			throw new HttpException(err.response, err.status);
		}
	}

	insertUsersInRoom(client : Socket, payload : Message, channelName : string){
		const receiverIsOnline =  this.checkIfReceiverIsOnline(payload.receiverId)
		client.join(channelName);
		if (receiverIsOnline){
			const receiverSocket: Socket = this.getReceiverSocket(payload.receiverId);
			receiverSocket.join(channelName);
		}
		const response = this.generateResponse(payload)
		return response
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
	//? __________________________________________________________________________________________________
}
