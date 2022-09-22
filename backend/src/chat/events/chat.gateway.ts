import {
	OnGatewayConnection,
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer,
} from "@nestjs/websockets";
import { Message } from "../dto/message.dto";
import { Server, Socket } from "socket.io";
import { ChatService } from "./chat.service";
import { JsonWebTokenError } from "jsonwebtoken";
import { User } from "../dto/user.dto";


@WebSocketGateway({
	cors: {
		origin: "*",
	},
})
export class ChatGateway {
	constructor(private readonly chatService: ChatService) {}

	@WebSocketServer()
	server: Server;

	@SubscribeMessage("connectUser")
	addConnectedUser(client: Socket, newUser : User) {
		console.log(client.id + "   " + newUser.id);
		this.chatService.addUserToOnlineUsers(newUser, client);
		console.table(this.chatService.onlineUsers[0])
		const users = []
		this.chatService.onlineUsers.map( user => {
			users.push({
				user : user.user
			})
		})
		console.log(users)
		this.server.emit("connectUserResponce", users)
	}
	
	@SubscribeMessage("disconnectUser")
	removeConnectedUser(client: Socket, userId: number) {
		console.log("function not implemented yet !!");
	}

	@SubscribeMessage("message")
	async handleMessage(client: Socket, payload: Message) {
		if (payload.isDm == true){
			const channelName: string = this.chatService.generateChannelName(payload.userId, payload.receiverId);
			const receiverIsOnline =  this.chatService.checkIfReceiverIsOnline(payload.receiverId)
			if (receiverIsOnline){
				const receiverSocket: Socket = this.chatService.getReceiverSocket(payload.receiverId);
				client.join(channelName);
				receiverSocket.join(channelName);
				const responce = {
					sender : await this.chatService.getUserData(payload.userId),
					content : payload.content,
					isDm : true
				}
				client.to(channelName).emit("receivedMessage", responce);
			}
			//! you need to test this function !!!
			await this.chatService.saveMessageInDatabase(payload)
		}
		else{
			const members = await this.chatService.getChannelMembers(payload.channelId)
			const sockets  : Socket[] = this.chatService.getsocketofMembers(members)
			sockets.forEach(socket => socket.join(payload.channelName))
			const responce = {
				sender : await this.chatService.getUserData(payload.userId),
				content : payload.content,
				isDm : false,
				channelId : payload.channelId,
				channelName : payload.channelName			
			}
			client.to(payload.channelName).emit("receivedMessage", responce)

		}
		return;
	}
}
