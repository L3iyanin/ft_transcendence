import { ChannleStatusEnum, MemberStatusEnum } from "../constants/enum";
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

export const dmChannels: IChatChannel[] = [
	{
		id: 1,
		name: "Khalid benlyazid",
		members: members,
		messages: messages,
		status: ChannleStatusEnum.DM,
		lastMessagdID: messages[0],
	},
	{
		id: 2,
		name: "Esther Howard",
		members: members,
		messages: messages,
		status: ChannleStatusEnum.DM,
		lastMessagdID: messages[1],
	},
	{
		id: 3,
		name: "Leslie Alexander",
		members: members,
		messages: messages,
		status: ChannleStatusEnum.DM,
		lastMessagdID: messages[2],
	},
	{
		id: 4,
		name: "Robert Fox",
		members: members,
		messages: messages,
		status: ChannleStatusEnum.DM,
		lastMessagdID: messages[3],
	},
	{
		id: 5,
		name: "Jacob Jones†",
		members: members,
		messages: messages,
		status: ChannleStatusEnum.DM,
		lastMessagdID: messages[4],
	},
];