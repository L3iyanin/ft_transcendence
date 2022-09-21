
import {Socket} from "socket.io";
import { User } from "./user.dto";

export class userWithSocket {
	socket: Socket;
	user: User;
}