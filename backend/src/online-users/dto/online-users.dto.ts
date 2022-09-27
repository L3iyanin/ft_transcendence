import {Socket} from "socket.io";


export class User {
	username: string;
	fullName: string;
	id: number;
}

export class UserSocket {
	socket: Socket;
	user: User;
	socketInGame: boolean;
}
