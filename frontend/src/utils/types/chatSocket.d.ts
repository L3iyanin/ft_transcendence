
interface IChatSocket {
	clientSocket: Socket | null;
	onlineUsers: IOnlineUser[];
	notifications: number;
}