import { UseGuards } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import {
	OnGatewayConnection,
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { UserGuard } from "src/users/user.guard";
import { Message } from "../dto/chat.dto";
import { ChatService } from "./chat.service";

@WebSocketGateway({
	cors: {
		origin: "*",
	},
})
export class ChatGateway implements OnGatewayConnection {
	jwtService = new JwtService();
	constructor(private readonly chatService: ChatService) {}

	public async handleConnection(client: Socket): Promise<any> {
		try {
			if (client.handshake.auth.access_token) {
				this.jwtService.verify(client.handshake.auth.access_token, {
					secret: process.env.JWT_SECRET,
				});
			} else {
				client.disconnect();
			}
		} catch (err) {
			console.log(err);
			client.disconnect();
		}
	}

	@WebSocketServer()
	server: Server;

	@SubscribeMessage("disconnectUser")
	removeConnectedUser(client: Socket, userId: number) {
		console.log("function not implemented yet !!");
	}

	@UseGuards(UserGuard)
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
