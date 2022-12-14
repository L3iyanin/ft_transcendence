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
import { JwtService } from "@nestjs/jwt";

// ! Check if user is authenticated
@WebSocketGateway({
	cors: {
		origin: "*",
	},
})
export class OnlineUsersGateway implements OnGatewayDisconnect {
	jwtService = new JwtService();

	constructor(
		private readonly onlineUsersService: OnlineUsersService,
		private readonly gameEventsService: GameEventsService
	) {}

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
			client.disconnect();
		}

	}

	@WebSocketServer()
	server: Server;

	handleDisconnect(client: any) {
		const userId: number | null = this.onlineUsersService.getUserIdbyClientId(client.id);
		const users = this.onlineUsersService.removeDisconnectedSocket(client);
		console.log("users disconnect----------", users);
		this.server.emit("connectUserResponse", users);
		console.log("--------------------------------");
		this.gameEventsService.handleDisconnectFromGame(userId, client);
	}

	@SubscribeMessage("connectUser")
	addConnectedUser(client: Socket, newUser: User) {
		const users = this.onlineUsersService.addConnectedUser(client, newUser);
		console.log("users connect+++++++++++", users);
		this.server.emit("connectUserResponse", users);
		console.log("+++++++++++++++++++++++++++++++");
	}
}
