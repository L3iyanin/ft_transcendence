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
	addConnectedUser(client: Socket, userId: number) {
		console.log(client.id + "   " + userId);
		this.chatService.addUerToOnlineUsers(userId, client.id, client);
	}

	@SubscribeMessage("disconnectUser")
	removeConnectedUser(client: Socket, userId: number) {
		console.log("function not implemented yet !!");
	}

	@SubscribeMessage("message")
	handleMessage(client: Socket, payload: Message) {
		console.log(payload);
		console.log(client.rooms);
		if (payload.isDm == true) {
			const channelName: string = this.chatService.generateChannelName(
				payload.userId,
				payload.receiverId
			);
			if (this.chatService.checkIfReceiverIsOnline(payload.receiverId)) {
				const receiverSocket: Socket = this.chatService.getReceiverSocket(
					payload.receiverId
				);
				client.join(channelName);
				receiverSocket.join(channelName);
				client.to(channelName).emit("message", payload.content);
			}
			//? save in database
			// check if receiver is online
			// if true
			// get receiver id , join it to room and send message to room
			// save message in database
		}
		return;
	}
}
