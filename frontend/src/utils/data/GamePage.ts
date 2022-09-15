import { MatchTypeEnum } from "../constants/enum";

const player1: IUser = {
	id: 1,
	fullName: "Imran Baali",
	username: "kirwa-ko",
	imgUrl: "https://myanimelist.tech/api/avatar?name=kirwako&animeName=Inazuma_Eleven",
	wins: 15,
	loses: 4,
	achievements: [],
};

const player2: IUser = {
	id: 2,
	fullName: "Abdali Ait Hmid",
	username: "twelve",
	imgUrl: "https://myanimelist.tech/api/avatar?name=twelve&animeName=Inazuma_Eleven",
	wins: 15,
	loses: 4,
	achievements: [],
};

export const fakeMatchWatchers: IUser[] = [
	{
		id: 3,
		fullName: "Imran Baali",
		username: "kirwa-ko",
		imgUrl:
			"https://myanimelist.tech/api/avatar?name=kirwako&animeName=Inazuma_Eleven"
	},
	{
		id: 4,
		fullName: "Abdali Ait Hmid",
		username: "twelve",
		imgUrl:
			"https://myanimelist.tech/api/avatar?name=twelve&animeName=Inazuma_Eleven",
	},
	{
		id: 5,
		fullName: "Khalid Belyazid",
		username: "seven",
		imgUrl:
			"https://myanimelist.tech/api/avatar?name=seven&animeName=Inazuma_Eleven",
	},
	{
		id: 6,
		fullName: "Youness Aroubi",
		username: "procrastinator",
		imgUrl:
			"https://myanimelist.tech/api/avatar?name=procrastinator&animeName=Inazuma_Eleven",
	},
	{
		id: 7,
		fullName: "Youssef Raki",
		username: "raki",
		imgUrl:
			"https://myanimelist.tech/api/avatar?name=raki&animeName=Inazuma_Eleven",
	},
];

export const fakeGameSettings: IMatch = {
	id: 1,
    isMatching: false,
    live: true,
    player1: player1,
    player2: player2,
    player1Score: 0,
    player2Score: 0,
    date: new Date(),
    scoreToWin: MatchTypeEnum.Classic,
	backgroundUrl: "/imgs/backgrounds/marineford-bg.png",
};
