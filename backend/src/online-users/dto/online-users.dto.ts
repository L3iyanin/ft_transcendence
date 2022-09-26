import {Socket} from "socket.io";


export class User {
	username: string;
	fullName: string;
	id: number;
}

export class UserWithSocket {
	socket: Socket;
	user: User;
}
