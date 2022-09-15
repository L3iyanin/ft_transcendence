import { ChannleStatusEnum } from "../constants/enum";
import { users } from "./Users";

export const members: IMember[] = users.map((user, index) => ({
	id: index + 1,
	user,
}));

export const messages: IMessage[] = [
	{
		id: 0,
		content: "fik may organizer wahed event f um6p",
		sender: users[0],
		date: new Date(),
		invite: true,
	},
	{
		id: 1,
		content: "fik may organizer wahed event f um6p",
		sender: users[1],
		date: new Date(),
	},
	{
		id: 2,
		content: "fik may organizer wahed event f um6p",
		sender: users[2],
		date: new Date(),
	},
	{
		id: 3,
		content: "fik may organizer wahed event f um6p",
		sender: users[3],
		date: new Date(),
	},
	{
		id: 4,
		content: "fik may organizer wahed event f um6p",
		sender: users[4],
		date: new Date(),
	},
	{
		id: 0,
		content: "fik may organizer wahed event f um6p",
		sender: users[0],
		date: new Date(),
	},
	{
		id: 1,
		content: "fik may organizer wahed event f um6p",
		sender: users[1],
		date: new Date(),
	},
	{
		id: 2,
		content: "fik may organizer wahed event f um6p",
		sender: users[2],
		date: new Date(),
	},
	{
		id: 3,
		content: "fik may organizer wahed event f um6p",
		sender: users[3],
		date: new Date(),
	},
	{
		id: 4,
		content: "fik may organizer wahed event f um6p",
		sender: users[4],
		date: new Date(),
	},
];

export const dmChannels: IChatChannel[] = users.map((user, index) => ({
	id: index + 1,
	name: user.fullName,
	members: members,
	messages: messages,
	status: ChannleStatusEnum.DM,
	lastMessage: messages[index % messages.length],
	imgUrl: user.imgUrl,
	notReadMessages: Math.floor(Math.random() * (0 - 5) + 5),
}))