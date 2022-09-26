import { UserStatusEnum } from "../constants/enum";

export const users: IUser[] = [
	{
		id: 1,
		fullName: "Imran Baali",
		username: "kirwa-ko",
		imgUrl: "https://myanimelist.tech/api/avatar?name=kirwako&animeName=Inazuma_Eleven",
		wins: 15,
		loses: 4,
		achievements: [],
		userStatus: UserStatusEnum.NONE,
	},
	{
		id: 2,
		fullName: "Abdali Ait Hmid",
		username: "twelve",
		imgUrl: "https://myanimelist.tech/api/avatar?name=twelve&animeName=Inazuma_Eleven",
		wins: 15,
		loses: 4,
		achievements: [],
	},
	{
		id: 3,
		fullName: "Khalid Belyazid",
		username: "seven",
		imgUrl:
			"https://myanimelist.tech/api/avatar?name=seven&animeName=Inazuma_Eleven",
	},
	{
		id: 4,
		fullName: "Youness Aroubi",
		username: "procrastinator",
		imgUrl:
			"https://myanimelist.tech/api/avatar?name=procrastinator&animeName=Inazuma_Eleven",
	},
	{
		id: 5,
		fullName: "Youssef Raki",
		username: "raki",
		imgUrl:
			"https://myanimelist.tech/api/avatar?name=raki&animeName=Inazuma_Eleven",
	},
];