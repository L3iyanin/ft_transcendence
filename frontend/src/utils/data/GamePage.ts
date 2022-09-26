import { MatchTypeEnum } from "../constants/enum";
import { users } from "./Users";

export const fakeMatchWatchers: IUser[] = users;

export const fakeGameSettings: IMatch = {
	id: 1,
    isMatching: false,
    live: true,
    player1: users[0],
    player2: users[1],
    player1Score: 0,
    player2Score: 0,
    date: new Date(),
    scoreToWin: MatchTypeEnum.Classic,
	backgroundUrl: "/imgs/backgrounds/marineford-bg.png",
};
