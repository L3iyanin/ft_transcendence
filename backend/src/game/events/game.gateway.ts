import { SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { JoinMatchDto } from "../dto/game.dto";
import { GameEventsService } from "./gameEvents.service";
import { Server, Socket } from "socket.io";
import { generateMatchName } from "../helpers/helpers";

@WebSocketGateway({
	cors: {
		origin: "*",
	},
})
export class GameGateway {
	constructor(private readonly gameEventsService: GameEventsService) {}

	@WebSocketServer()
	server: Server;

	@SubscribeMessage("joinGame")
	async joinGame(client: Socket, payload: JoinMatchDto) {
		const response = await this.gameEventsService.joinGame(payload.userId, payload.scoreToWin);
		if (response.check) {
			const matchName = generateMatchName(response.data.matchId);
			const { player1Sockets, player2Sockets } = this.gameEventsService.getPlayersSockets(
				response.data.player1.id,
				response.data.player2.id
			);
			this.joinSocketsToMatchRoom(matchName, player1Sockets);
			this.joinSocketsToMatchRoom(matchName, player2Sockets);
			this.server.to(matchName).emit("joinGameResponse", response.data);
		}
	}

	joinSocketsToMatchRoom(matchName: string, sockets: Socket[]) {
		sockets.forEach((socket) => {
			socket.join(matchName);
		});
	}
}
