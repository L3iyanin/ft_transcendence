import { Module } from '@nestjs/common';
import { OnlineUsersModule } from 'src/online-users/online-users.module';

@Module({})
export class GameModule {
	imports: [OnlineUsersModule];
}
