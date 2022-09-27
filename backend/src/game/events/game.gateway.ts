import { SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { JoinMatchDto } from "../dto/game-events.dto";
import { GameEventsService } from "./game-events.service";
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
		const response = await this.gameEventsService.joinGame(
			payload.userId,
			payload.scoreToWin,
			client.id
		);
		if (response.check === "START_MATCH") {
			const matchName = generateMatchName(response.data.matchId);
			const { player1Socket, player2Socket } = this.gameEventsService.getPlayersSockets(
				response.data.player1.id,
				response.data.player2.id
			);
			player1Socket.join(matchName);
			player2Socket.join(matchName);
			this.server.to(matchName).emit("joinGameResponse", response.data);
		} else if (response.check === "ALREADY_IN_MATCH") {
			client.emit("alreadyInMatch");
		} else if (response.check === "MATCHING") {
			client.emit("matching");
		}
	}

	@SubscribeMessage("readyToPlay")
	async readyToPlay(client: Socket, payload: { userId: number; matchId: number }) {
		const matchName = generateMatchName(payload.matchId);
		const message = await this.gameEventsService.readyToPlay(
			payload.userId,
			payload.matchId,
			this.server
		);
		const username =
			(await this.gameEventsService.getUsername(payload.userId)) + " is ready to play";
		client.to(matchName).emit("readyToPlayResponse", { message, username });
	}

	@SubscribeMessage("updatePlayerY")
	async updatePlayerY(
		client: Socket,
		payload: { matchId: number; userId: number; newY: number }
	) {
		await this.gameEventsService.updatePlayerY(payload.matchId, payload.userId, payload.newY);
	}
}
