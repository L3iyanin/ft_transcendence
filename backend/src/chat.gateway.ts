import { SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

interface Ichannel {
	name: string;
	messages: Imessage[];
	owner: number;
	members: Imember[];
}

interface Imember {
	id: number;
	client: Socket | null;
}

interface Imessage {
	content: string;
	from: number;
	to: number;
}

function generate_channel_name(message: Imessage) {
	return message.from < message.to
		? `${message.from}-${message.to}`
		: `${message.to}-${message.from}`;
}

@WebSocketGateway({
	cors: "*",
})
export class ChatGateway {
	@WebSocketServer()
	server: Server;

	channels: Ichannel[] = [];

	@SubscribeMessage("message")
	handleMessage(client: Socket, payload: Imessage): void {
		const channel_name = generate_channel_name(payload);
		const channel = this.channels.find((channel) => channel.name === channel_name);

		if (!channel) {
			this.channels.push({
				name: channel_name,
				messages: [payload],
				owner: payload.from,
				members: [
					{
						id: payload.from,
						client,
					},
					{
						id: payload.to,
						client: null,
					},
				],
			});
			console.log("new channel created");
			console.log("client joined channel", channel_name, payload.from);
		} else {
			channel.messages.push(payload);
			channel.members.forEach((member) => {
				if (member.id === payload.from) {
					member.client = client;
					client.join(channel_name);
					console.log("client joined channel", channel_name);
				}
			});
		}
		// get all rooms in the server
		const rooms = this.server.sockets.sockets;
		console.log("weeeeee: ", rooms);
		this.server.to(channel_name).emit("message", payload);
	}
}
