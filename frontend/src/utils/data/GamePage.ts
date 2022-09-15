
const player1: IGamePlayer = {
	id: "1",
	fullName: "Imran Baali",
	score: 2,
	username: "kirwa-ko",
	imageUrl:
		"https://myanimelist.tech/api/avatar?name=kirwako&animeName=Inazuma_Eleven",
	wins: 15,
	losses: 4,
	achievements: 3,
};

const player2: IGamePlayer = {
	id: "2",
	fullName: "Abdali Ait Hmid",
	score: 7,
	username: "twelve",
	imageUrl:
		"https://myanimelist.tech/api/avatar?name=twelve&animeName=Inazuma_Eleven",
	wins: 15,
	losses: 4,
	achievements: 6,
};

const fakeGameWatchers: IGameWatcher[] = [
	{
		id: "3",
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
		id: "4",
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
		id: "5",
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
		id: "6",
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
		id: "7",
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
