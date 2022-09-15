
interface IGamePlayer {
	id: string;
	fullName: string;
	username: string;
	score: number;
	imageUrl: string;
	wins: number;
	losses: number;
	achievements: number;
}

interface IGameSettings {
	name: string;
	goalsToWin: number;
	backgroundUrl: string;
	player1: IGamePlayer;
	player2: IGamePlayer;
	watchers: IGameWatcher[];
}

interface IGameWatcher {
	id: string;
	fullName: string;
	username: string;
	imageUrl: string;
	charUrl: string;
	profileUrl: string;
}


interface IGameMatch {
	player1: IGamePlayer;
	player2: IGamePlayer;
	player1Score: number;
	player2Score: number;
	isMatching: boolean;
	isLive: boolean;
	date: Date;
	type: GameType;
}

interface IMatchProps {
	children: IGameMatch;
	className: string;
	scoreStyle: string;
}

interface IScoreProps {
	score1: number;
	score2: number;
	className: string;
}

interface IPlayerProps {
	username: string;
	avatar: string;
	className: string;
}

interface IOptionProps {
	url: string;
	children: string;
}

interface IAchievement {
    name : string;
    achieved : boolean;
    description : string;
    imgUrl : string;
}

interface IAchievementProps {
	achievement: IAchievement;
}

interface IAchievementsListProps {
	achievements: IAchievement[];
}

interface IFriendProps {
	user: IGamePlayer;
}