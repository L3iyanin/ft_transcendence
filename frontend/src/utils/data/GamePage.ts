import { IGamePlayer, IGameSettings, IGameWatcher } from "../types/Game";

const player1: IGamePlayer = {
	fullName: "Imran Baali",
	score: 2,
	username: "kirwa-ko",
	imageUrl:
		"https://myanimelist.tech/api/avatar?name=kirwako&animeName=Inazuma_Eleven",
	wins: 15,
	loses: 4,
	achivements: 3,
};

const player2: IGamePlayer = {
	fullName: "Abdali Ait Hmid",
	score: 7,
	username: "twelve",
	imageUrl:
		"https://myanimelist.tech/api/avatar?name=twelve&animeName=Inazuma_Eleven",
	wins: 15,
	loses: 4,
	achivements: 3,
};

const fakeGameWatchers: IGameWatcher[] = [
	{
		fullName: "Imran Baali",
		username: "kirwa-ko",
		imageUrl:
			"https://myanimelist.tech/api/avatar?name=kirwako&animeName=Inazuma_Eleven",
		charUrl:
			"https://myanimelist.tech/api/char?name=kirwako&animeName=Inazuma_Eleven",
		profileUrl:
			"https://myanimelist.tech/api/profile?name=kirwako&animeName=Inazuma_Eleven",
	},
	{
		fullName: "Abdali Ait Hmid",
		username: "twelve",
		imageUrl:
			"https://myanimelist.tech/api/avatar?name=twelve&animeName=Inazuma_Eleven",
		charUrl:
			"https://myanimelist.tech/api/char?name=twelve&animeName=Inazuma_Eleven",
		profileUrl:
			"https://myanimelist.tech/api/profile?name=twelve&animeName=Inazuma_Eleven",
	},
	{
		fullName: "Khalid Belyazid",
		username: "seven",
		imageUrl:
			"https://myanimelist.tech/api/avatar?name=seven&animeName=Inazuma_Eleven",
		charUrl:
			"https://myanimelist.tech/api/char?name=seven&animeName=Inazuma_Eleven",
		profileUrl:
			"https://myanimelist.tech/api/profile?name=seven&animeName=Inazuma_Eleven",
	},
	{
		fullName: "Youness Aroubi",
		username: "procrastinator",
		imageUrl:
			"https://myanimelist.tech/api/avatar?name=procrastinator&animeName=Inazuma_Eleven",
		charUrl:
			"https://myanimelist.tech/api/char?name=procrastinator&animeName=Inazuma_Eleven",
		profileUrl:
			"https://myanimelist.tech/api/profile?name=procrastinator&animeName=Inazuma_Eleven",
	},
	{
		fullName: "Youssef Raki",
		username: "raki",
		imageUrl:
			"https://myanimelist.tech/api/avatar?name=raki&animeName=Inazuma_Eleven",
		charUrl:
			"https://myanimelist.tech/api/char?name=raki&animeName=Inazuma_Eleven",
		profileUrl:
			"https://myanimelist.tech/api/profile?name=raki&animeName=Inazuma_Eleven",
	},
];

export const fakeGameSettings: IGameSettings = {
	name: "Marineford Pong",
	goalsToWin: 3,
	backgroundUrl: "/imgs/backgrounds/marineford-bg.png",
	player1: player1,
	player2: player2,
	watchers: fakeGameWatchers,
};
