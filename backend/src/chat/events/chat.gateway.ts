import {
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { Message } from "../dto/chat.dto";
import { ChatService } from "./chat.service";

@WebSocketGateway({
	cors: {
		origin: "*",
	},
})
export class ChatGateway {
	constructor(private readonly chatService: ChatService) {}

	@WebSocketServer()
	server: Server;

	// @SubscribeMessage("connectUser")
	// addConnectedUser(client: Socket, newUser: User) {
	// 	const users = this.chatService.addConnectedUser(client, newUser);
	// 	this.server.emit("connectUserResponse", users);
	// }

	@SubscribeMessage("disconnectUser")
	removeConnectedUser(client: Socket, userId: number) {
		console.log("function not implemented yet !!");
	}

	@SubscribeMessage("sendMessage")
	async handleMessage(client: Socket, payload: Message) {
		const messageData = await this.chatService.handleMessage(client, payload);
		if (messageData.error) {
			if (messageData.status == "BLOCKED") {
				client.emit("youbAreBlocked", messageData);
			} else {
				client.emit("youAreMuted", messageData);
			}
		} else client.to(messageData.channelName).emit("receivedMessage", messageData.response);
	}
}
