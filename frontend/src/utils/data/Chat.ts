import { ChannleTypesEnum, RolesEnum } from "../constants/enum";
import { users } from "./Users";

export const members: IMember[] = users.map((user, index) => ({
	id: index + 1,
	user,
}));

members[2].role = RolesEnum.ADMIN;

export const messages: IMessage[] = [
	{
		id: 0,
		content: "hello, friend",
		from: members[0],
		date: new Date(),
	},
	{
		id: 1,
		content: "heyy, how are you?",
		from: members[1],
		date: new Date(),
	},
	{
		id: 2,
		content: "I'm fine, thanks",
		from: members[0],
		date: new Date(),
	},
	{
		id: 3,
		content: "what about you?",
		from: members[1],
		date: new Date(),
	},
	{
		id: 4,
		content: "I'm fine too",
		from: members[0],
		date: new Date(),
	},
	{
		id: 5,
		content: "what are you doing?",
		from: members[0],
		date: new Date(),
	},
	{
		id: 6,
		content: "I'm working on a project about how to use typescript with react",
		from: members[1],
		date: new Date(),
	},
	{
		id: 7,
		content: "that's great",
		from: members[1],
		date: new Date(),
		invite: true,
	},
	{
		id: 8,
		content: "can I join you?",
		from: members[0],
		date: new Date(),
	},
	{
		id: 9,
		content: "no, fuck off",
		from: members[1],
		date: new Date(),
	},
];

export const dmChannels: IChatChannel[] = users.map((user, index) => ({
	id: index + 1,
	name: user.fullName,
	members: members,
	messages: messages,
	status: ChannleTypesEnum.DM,
	lastMessage: messages[index % messages.length],
	imgUrl: user.imgUrl,
	uneadMessages: Math.floor(Math.random() * (0 - 5) + 5),
}))

const GroupMessages: IMessage[] = [
	{
		id: 0,
		content: "hello, friend",
		from: members[0],
		date: new Date(),
	},
	{
		id: 1,
		content: "heyy, how are you?",
		from: members[1],
		date: new Date(),
	},
	{
		id: 2,
		content: "I'm fine, thanks",
		from: members[2],
		date: new Date(),
	},
	{
		id: 3,
		content: "what about you?",
		from: members[3],
		date: new Date(),
	},
	{
		id: 4,
		content: "I'm fine too",
		from: members[4],
		date: new Date(),
	},
	{
		id: 5,
		content: "what are you doing?",
		from: members[0],
		date: new Date(),
	},
	{
		id: 6,
		content: "I'm working on a project about how to use typescript with react, and you?",
		from: members[1],
		date: new Date(),
	},
	{
		id: 7,
		content: "doing the same thing",
		from: members[2],
		date: new Date(),
	},
	{
		id: 8,
		content: "can I join you?",
		from: members[3],
		date: new Date(),
	},
	{
		id: 9,
		content: "no, fuck off",
		from: members[4],
		date: new Date(),
	},
];

export const GroupChannels: IChatChannel[] = [
	{
		id: 0,
		name: "L3iyanin",
		members: members,
		messages: GroupMessages,
		status: ChannleTypesEnum.PUBLIC,
		lastMessage: messages[0],
		imgUrl: "https://myanimelist.tech/api/avatar?name=l3iyaninsa&animeName=Hunter_x_Hunter",
		uneadMessages: Math.floor(Math.random() * (0 - 5) + 5),
	},
	{
		id: 1,
		name: "Swimming Team",
		members: members,
		messages: GroupMessages,
		status: ChannleTypesEnum.PUBLIC,
		lastMessage: messages[1],
		imgUrl: "https://myanimelist.tech/api/avatar?name=Swimming%20Team&animeName=Hunter_x_Hunter",
		uneadMessages: Math.floor(Math.random() * (0 - 5) + 5),
	},
	{
		id: 2,
		name: "Football Team",
		members: members,
		messages: GroupMessages,
		status: ChannleTypesEnum.PROTECTED,
		lastMessage: messages[2],
		imgUrl: "https://myanimelist.tech/api/avatar?name=Foswotball%20Team&animeName=Hunter_x_Hunter",
		uneadMessages: Math.floor(Math.random() * (0 - 5) + 5),
	},
	{
		id: 3,
		name: "Tali3a",
		members: members,
		messages: GroupMessages,
		status: ChannleTypesEnum.PUBLIC,
		lastMessage: messages[3],
		imgUrl: "https://myanimelist.tech/api/avatar?name=Tali3a&animeName=Hunter_x_Hunter",
		uneadMessages: Math.floor(Math.random() * (0 - 5) + 5),
	},
	{
		id: 4,
		name: "Trip chamal",
		members: members,
		messages: GroupMessages,
		status: ChannleTypesEnum.PROTECTED,
		lastMessage: messages[4],
		imgUrl: "https://myanimelist.tech/api/avatar?name=Trip%20chamal&animeName=Hunter_x_Hunter",
		uneadMessages: Math.floor(Math.random() * (0 - 5) + 5),
	},
	{
		id: 5,
		name: "Ta9zdert Iferfer",
		members: members,
		messages: GroupMessages,
		status: ChannleTypesEnum.PRIVATE,
		lastMessage: messages[5],
		imgUrl: "https://myanimelist.tech/api/avatar?name=Tas9zdert%20Iferfer&animeName=Hunter_x_Hunter",
		uneadMessages: Math.floor(Math.random() * (0 - 5) + 5),
	},
]

