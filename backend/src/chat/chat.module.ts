import { Module } from '@nestjs/common';
import { ChatGateway } from './events/chat.gateway';
import { ChatService } from './events/chat.service';

@Module({
  providers: [ChatGateway, ChatService]
})
export class ChatModule {}
