
interface IAchievement {
    id: number,
    name: string,
    description: string,
    imgUrl: string,
    users: IUser[],
}

interface IUser {
    id: number,
    username: string,
    fullName: string,
    imgUrl: string,
	numberOfAchievements?: number,
    achievements?: IAchievement[]
    wins?: number,
    losses?: number,
    login?: string,
    twoFactorAuth?: boolean,
	numberOfFriends?: number,
    friends?: IUser[],
    friendsRelation?: IUser[],
	isFriend?: boolean,
    createdChannles?: IChatChannel[],
    members?: IMember[],
    messages?: Message[],
	userStatus?: UserStatusEnum,
	isOnline?: boolean,
	isInGame?: boolean,
}

interface IUserState {
	user: UserInterface | null;
	isLoggedIn: boolean;
	isLoading: boolean;
}

interface ISettingsState {
	lng: LanguagesEnum;
}

interface UserInterface {
	id: number;
	username: string,
	fullName: string,
	imgUrl?: string,
	token?: string,
	firstTime?: boolean,
	// login?: string,
	// losses?: number,
	// twoFactorAuth?: boolean
	// wins?: number,
	expiresIn?: string,
}

interface IOnlineUser {
	user: {
		username: string;
		fullName: string;
		inGame: boolean;
		id: number;
	}
}