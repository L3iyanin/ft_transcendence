
import {Socket} from "socket.io";
import { User } from "./user.dto";

export class UserWithSocket {
	socket: Socket;
	user: User;
}