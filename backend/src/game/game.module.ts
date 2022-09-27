import { Module } from "@nestjs/common";
import { OnlineUsersModule } from "src/online-users/online-users.module";
import { GameController } from "./controllers/game.controller";
import { GameService } from "./controllers/game.service";
import { GameEventsService } from "./events/game-events.service";
import { GameGateway } from "./events/game.gateway";

@Module({
	imports: [OnlineUsersModule],
	controllers: [GameController],
	providers: [GameEventsService, GameGateway, GameService],
	exports: [GameEventsService],
})
export class GameModule {}
