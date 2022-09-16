import { ChannleStatusEnum, RolesEnum } from "../constants/enum";
import { users } from "./Users";

export const members: IMember[] = users.map((user, index) => ({
	id: index + 1,
	user,
}));

members[2].role = RolesEnum.ADMIN;

export const messages: IMessage[] = [
	{
		id: 0,
		content: "fik may organizer wahed event f um6p",
		sender: members[0],
		date: new Date(),
	},
	{
		id: 1,
		content: "fik may organizer wahed event f um6p",
		sender: members[1],
		date: new Date(),
	},
	{
		id: 2,
		content: "fik may organizer wahed event f um6p",
		sender: members[0],
		date: new Date(),
	},
	{
		id: 3,
		content: "fik may organizer wahed event f um6p",
		sender: members[1],
		date: new Date(),
	},
	{
		id: 4,
		content: "fik may organizer wahed event f um6p",
		sender: members[0],
		date: new Date(),
	},
	{
		id: 5,
		content: "fik may organizer wahed event f um6p",
		sender: members[0],
		date: new Date(),
	},
	{
		id: 6,
		content: "fik may organizer wahed event f um6p",
		sender: members[1],
		date: new Date(),
	},
	{
		id: 7,
		content: "fik may organizer wahed event f um6p",
		sender: members[1],
		date: new Date(),
		invite: true,
	},
	{
		id: 8,
		content: "fik may organizer wahed event f um6p",
		sender: members[0],
		date: new Date(),
	},
	{
		id: 9,
		content: "fik may organizer wahed event f um6p",
		sender: members[1],
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
	uneadMessages: Math.floor(Math.random() * (0 - 5) + 5),
}))

const NotDMessages: IMessage[] = [
	{
		id: 0,
		content: "fik may organizer wahed event f um6p",
		sender: members[0],
		date: new Date(),
	},
	{
		id: 1,
		content: "fik may organizer wahed event f um6p",
		sender: members[1],
		date: new Date(),
	},
	{
		id: 2,
		content: "fik may organizer wahed event f um6p",
		sender: members[2],
		date: new Date(),
	},
	{
		id: 3,
		content: "fik may organizer wahed event f um6p",
		sender: members[3],
		date: new Date(),
	},
	{
		id: 4,
		content: "fik may organizer wahed event f um6p",
		sender: members[4],
		date: new Date(),
	},
	{
		id: 5,
		content: "fik may organizer wahed event f um6p",
		sender: members[0],
		date: new Date(),
	},
	{
		id: 6,
		content: "fik may organizer wahed event f um6p",
		sender: members[1],
		date: new Date(),
	},
	{
		id: 7,
		content: "fik may organizer wahed event f um6p",
		sender: members[2],
		date: new Date(),
	},
	{
		id: 8,
		content: "fik may organizer wahed event f um6p",
		sender: members[3],
		date: new Date(),
	},
	{
		id: 9,
		content: "fik may organizer wahed event f um6p",
		sender: members[4],
		date: new Date(),
	},
];

export const NotDmChannels: IChatChannel[] = [
	{
		id: 0,
		name: "L3iyanin",
		members: members,
		messages: NotDMessages,
		status: ChannleStatusEnum.PUBLIC,
		lastMessage: messages[0],
		imgUrl: "https://myanimelist.tech/api/avatar?name=l3iyaninsa&animeName=Hunter_x_Hunter",
		uneadMessages: Math.floor(Math.random() * (0 - 5) + 5),
	},
	{
		id: 1,
		name: "Swimming Team",
		members: members,
		messages: NotDMessages,
		status: ChannleStatusEnum.PUBLIC,
		lastMessage: messages[1],
		imgUrl: "https://myanimelist.tech/api/avatar?name=Swimming%20Team&animeName=Hunter_x_Hunter",
		uneadMessages: Math.floor(Math.random() * (0 - 5) + 5),
	},
	{
		id: 2,
		name: "Football Team",
		members: members,
		messages: NotDMessages,
		status: ChannleStatusEnum.PROTECTED,
		lastMessage: messages[2],
		imgUrl: "https://myanimelist.tech/api/avatar?name=Foswotball%20Team&animeName=Hunter_x_Hunter",
		uneadMessages: Math.floor(Math.random() * (0 - 5) + 5),
	},
	{
		id: 3,
		name: "Tali3a",
		members: members,
		messages: NotDMessages,
		status: ChannleStatusEnum.PUBLIC,
		lastMessage: messages[3],
		imgUrl: "https://myanimelist.tech/api/avatar?name=Tali3a&animeName=Hunter_x_Hunter",
		uneadMessages: Math.floor(Math.random() * (0 - 5) + 5),
	},
	{
		id: 4,
		name: "Trip chamal",
		members: members,
		messages: NotDMessages,
		status: ChannleStatusEnum.PROTECTED,
		lastMessage: messages[4],
		imgUrl: "https://myanimelist.tech/api/avatar?name=Trip%20chamal&animeName=Hunter_x_Hunter",
		uneadMessages: Math.floor(Math.random() * (0 - 5) + 5),
	},
	{
		id: 5,
		name: "Ta9zdert Iferfer",
		members: members,
		messages: NotDMessages,
		status: ChannleStatusEnum.PRIVATE,
		lastMessage: messages[5],
		imgUrl: "https://myanimelist.tech/api/avatar?name=Tas9zdert%20Iferfer&animeName=Hunter_x_Hunter",
		uneadMessages: Math.floor(Math.random() * (0 - 5) + 5),
	},
]

