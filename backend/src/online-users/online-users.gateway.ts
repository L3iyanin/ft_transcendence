import {
	OnGatewayDisconnect,
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer,
} from "@nestjs/websockets";
import { User } from "./dto/online-users.dto";
import { Server, Socket } from "socket.io";
import { OnlineUsersService } from "./online-users.service";


// ! Check if user is authenticated
@WebSocketGateway({
	cors: {
		origin: "*",
	},
})
export class OnlineUsersGateway implements OnGatewayDisconnect {
	constructor(private readonly onlineUsersService: OnlineUsersService) {}

	@WebSocketServer()
	server: Server;

	handleDisconnect(client: any) {
		const users = this.onlineUsersService.removeDisconnectedSocket(client);
		this.server.emit("connectUserResponse", users);
	}

	@SubscribeMessage("connectUser")
	addConnectedUser(client: Socket, newUser: User) {
		const users = this.onlineUsersService.addConnectedUser(client, newUser);
		this.server.emit("connectUserResponse", users);
	}
}
