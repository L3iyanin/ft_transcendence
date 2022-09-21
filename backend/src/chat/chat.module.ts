import { Module } from "@nestjs/common";
import { ChatController } from "./controllers/chat.controller";
import { ChatService as ControllersChatService } from "./controllers/chat.service";
import { ChatGateway } from "./events/chat.gateway";
import { ChatService as EventsChatService } from "./events/chat.service";

@Module({
	controllers: [ChatController],
	providers: [ChatGateway, EventsChatService, ControllersChatService],
})
export class ChatModule {}
