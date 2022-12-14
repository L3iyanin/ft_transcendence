import { Injectable } from "@nestjs/common";
import { UserSocket, User } from "./dto/online-users.dto";
import { Socket } from "socket.io";

@Injectable()
export class OnlineUsersService {
	onlineUsers: UserSocket[];

	constructor() {
		this.onlineUsers = [];
	}

	addConnectedUser(client: Socket, newUser: User) {
		const alreadyExist = this.onlineUsers.some((user) => user.socket.id == client.id);
		if (!alreadyExist) {
			this.onlineUsers.push({
				user: newUser,
				socket: client,
				socketInGame: false,
			});
		}
		const users = [];
		this.onlineUsers.map((user) => {
			users.push({
				user: {
					...user.user,
					inGame: user.socketInGame,
				}
			});
		});
		// remove duplicates
		// and if inGame is true, set it to true
		const uniqueUsers = [];
		users.forEach((user) => {
			const userIndex = uniqueUsers.findIndex((u) => u.user.id == user.user.id);
			if (userIndex == -1) {
				uniqueUsers.push(user);
			} else {
				if (user.user.inGame) {
					uniqueUsers[userIndex].user.inGame = true;
				}
			}
		});
		return uniqueUsers;
	}

	// * Helper function ****************************************

	getUserIdbyClientId(clientId: string): number | null {
		if (this.onlineUsers.length > 0) {
			const user = this.onlineUsers.find((user) => {
				if (!user) return false;
				return user.socket.id == clientId;
			});
			if (user) return user.user.id;
		}
		return null;
	}

	removeDisconnectedSocket(clinet: Socket) {
		this.onlineUsers = this.onlineUsers.filter((user) => user.socket.id != clinet.id);
		const users = [];
		this.onlineUsers.map((user) => {
			users.push({
				user: {
					...user.user,
					inGame: user.socketInGame,
				}
			});
		});
		// remove duplicates
		// and if inGame is true, set it to true
		const uniqueUsers = [];
		users.forEach((user) => {
			const userIndex = uniqueUsers.findIndex((u) => u.user.id == user.user.id);
			if (userIndex == -1) {
				uniqueUsers.push(user);
			} else {
				if (user.user.inGame) {
					uniqueUsers[userIndex].user.inGame = true;
				}
			}
		}
		);
		return uniqueUsers;
	}

	checkIfReceiverIsOnline(receiverId: number): boolean {
		return this.onlineUsers.some((user) => user.user.id == receiverId);
	}

	getUserSockets(receiverId: number): Socket[] {
		const sockets: Socket[] = [];
		this.onlineUsers.forEach((user) => {
			if (user.user.id == receiverId) sockets.push(user.socket);
		});
		return sockets;
	}

	getUserGameSocket(userId: number): Socket | null {
		const userSockets: UserSocket[] = this.onlineUsers.filter((user) => user.user.id == userId);
		const userGameSocket = userSockets.find((user) => user.socketInGame);
		if (userGameSocket) return userGameSocket.socket;
		return null;
	}

	setSocketInGame(clientId: string) {
		const user = this.onlineUsers.find((user) => user.socket.id == clientId);
		user.socketInGame = true;
	}

	setSocketNotInGame(clientId: string) {
		const user = this.onlineUsers.find((user) => user.socket.id == clientId);
		if (user) user.socketInGame = false;
	}
}
