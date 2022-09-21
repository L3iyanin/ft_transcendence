
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
    loses?: number,
    login?: string,
    twoFactorAuth?: boolean,
	numberOfFriends?: number,
    friends?: IUser[],
    friendsRelation?: IUser[],
    friendRequests?: IUser[],
    friendRequestsRelation?: IUser[],
    createdChannles?: IChatChannel[],
    members?: IMember[],
    messages?: Message[],
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
	username: string,
	fullName: string,
	expiresIn?: string,
}

interface IOnlineUser {
	socketId: string;
	user: UserInterface;
}