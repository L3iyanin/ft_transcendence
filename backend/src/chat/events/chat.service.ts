import { Injectable } from "@nestjs/common";
import { Socket } from "socket.io";

export interface clientInterface {
	userId: number;
	socketId: string;
    socket : Socket
}

@Injectable()
export class ChatService {
	onlineUsers: clientInterface[] = [];

	generateChannelName(memebrId1: number, memebrId2: number): string {
		const channelName =
			memebrId1 < memebrId2
				? `${memebrId1.toString()}_${memebrId2.toString()}`
				: `${memebrId2.toString()}_${memebrId1.toString()}`;
		return channelName;
	}

	checkIfReceiverIsOnline(receiverId: number) : boolean {
		return this.onlineUsers.some((user) => user.userId == receiverId);
	}
	getReceiverSocket(receiverId: number) : Socket {
		const user = this.onlineUsers.find((user) => user.userId == receiverId);
        return user.socket
	}

	addUerToOnlineUsers(userId : number, socketId : string, socket : Socket) {
		this.onlineUsers.push({
            userId : userId,
            socketId : socketId,
            socket : socket
        });
	}
}
