import { Module } from '@nestjs/common';
import { OnlineUsersModule } from 'src/online-users/online-users.module';
import { GameEventsService } from './events/game-events.service';
import { GameGateway } from './events/game.gateway';

@Module({
	imports: [OnlineUsersModule],
	providers: [GameEventsService, GameGateway],
	exports: [GameEventsService],
})
export class GameModule {}
