import { Module } from '@nestjs/common';
import { ChatModule } from 'src/chat/chat.module';

@Module({})
export class GameModule {
	imports: [ChatModule];
}
