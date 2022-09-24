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
import { generateChannelName } from "../helpers";


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
		const users = this.chatService.addConnectedUser(client, newUser)
		this.server.emit("connectUserResponse", users)
	}
	
	@SubscribeMessage("disconnectUser")
	removeConnectedUser(client: Socket, userId: number) {
		console.log("function not implemented yet !!");
	}

	@SubscribeMessage("message")
	async handleMessage(client: Socket, payload: Message) {
		const messageData = await this.chatService.handleMessage(client, payload)
		console.log("channelName : " + messageData.channelName)
		client.to(messageData.channelName).emit("receivedMessage", messageData.response);
	}
}
