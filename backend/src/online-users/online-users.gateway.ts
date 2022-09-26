import {
	OnGatewayDisconnect,
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer,
} from "@nestjs/websockets";
import { User } from "./dto/online-users.dto";
import { Server, Socket } from "socket.io";
import { OnlineUsersService } from "./online-users.service";
import { GameEventsService } from "src/game/events/game-events.service";

// ! Check if user is authenticated
@WebSocketGateway({
	cors: {
		origin: "*",
	},
})
export class OnlineUsersGateway implements OnGatewayDisconnect {
	constructor(
		private readonly onlineUsersService: OnlineUsersService,
		private readonly gameEventsService: GameEventsService
	) {}

	@WebSocketServer()
	server: Server;

	handleDisconnect(client: any) {
		const userId = this.onlineUsersService.getUserIdbyClientId(client.id);
		const users = this.onlineUsersService.removeDisconnectedSocket(client);
		this.server.emit("connectUserResponse", users);
		// this.gameEventsService.handleDisconnectFromGame(userId, client);
	}

	@SubscribeMessage("connectUser")
	addConnectedUser(client: Socket, newUser: User) {
		const users =  this.onlineUsersService.addConnectedUser(client, newUser);
		this.server.emit("connectUserResponse", users);
	}
}
