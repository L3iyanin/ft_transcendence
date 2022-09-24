import { Module } from "@nestjs/common";
import { ChatModule } from "src/chat/chat.module";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

@Module({
	controllers: [UsersController],
	providers: [UsersService],
	imports: [ChatModule],
})
export class UsersModule {}
