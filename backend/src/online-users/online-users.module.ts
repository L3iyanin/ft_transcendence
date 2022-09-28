import { forwardRef } from "@nestjs/common";
import { Module } from "@nestjs/common";
import { GameEventsService } from "src/game/events/game-events.service";
import { GameModule } from "src/game/game.module";
import { UsersModule } from "src/users/users.module";
import { OnlineUsersGateway } from "./online-users.gateway";
import { OnlineUsersService } from "./online-users.service";

@Module({
	imports: [forwardRef(() =>UsersModule)],
	providers: [OnlineUsersService, GameEventsService, OnlineUsersGateway],
	exports: [OnlineUsersService],
})
export class OnlineUsersModule {}
