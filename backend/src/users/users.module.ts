import { forwardRef } from "@nestjs/common";
import { Module } from "@nestjs/common";
import { ChatModule } from "src/chat/chat.module";
import { OnlineUsersModule } from "src/online-users/online-users.module";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

@Module({
    controllers: [UsersController],
    providers: [UsersService],
    imports: [forwardRef(() =>ChatModule)],
    exports : [UsersService]
})
export class UsersModule {}
