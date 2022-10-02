import { forwardRef } from "@nestjs/common";
import { Module } from "@nestjs/common";
import { OnlineUsersModule } from "src/online-users/online-users.module";
import { ChatController } from "./controllers/chat.controller";
import { ChatService as ControllersChatService } from "./controllers/chat.service";
import { ChatGateway } from "./events/chat.gateway";
import { ChatService as EventsChatService } from "./events/chat.service";

@Module({
	imports: [forwardRef(() =>OnlineUsersModule)],
	controllers: [ChatController],
	providers: [ChatGateway, EventsChatService, ControllersChatService],
	exports: [ControllersChatService, EventsChatService]
})
export class ChatModule {}
