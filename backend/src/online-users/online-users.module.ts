import { Module } from "@nestjs/common";
import { OnlineUsersGateway } from "./online-users.gateway";
import { OnlineUsersService } from "./online-users.service";

@Module({
	providers: [OnlineUsersService, OnlineUsersGateway],
	exports: [OnlineUsersService],
})
export class OnlineUsersModule {}
