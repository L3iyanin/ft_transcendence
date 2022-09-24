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
	addConnectedUser(client: Socket, newUser: User) {
		const users = this.chatService.addConnectedUser(client, newUser);
		this.server.emit("connectUserResponse", users);
	}

	@SubscribeMessage("disconnectUser")
	removeConnectedUser(client: Socket, userId: number) {
		console.log("function not implemented yet !!");
	}

	@SubscribeMessage("sendMessage")
	async handleMessage(client: Socket, payload: Message) {
		// console.log("message received", payload);
		const messageData = await this.chatService.handleMessage(client, payload);
		// console.log("channelName : " + messageData.channelName)
		console.log("--------------------------------------------");
		console.log(messageData);
		console.log("--------------------------------------------");
		if (messageData.error) {
			if (messageData.status == "BLOCKED") {
				client.emit("youbAreBlocked", messageData);
			} else {
				console.log(client.id);
				client.emit("youAreMuted", messageData);
			}
		} else client.to(messageData.channelName).emit("receivedMessage", messageData.response);
	}
}
