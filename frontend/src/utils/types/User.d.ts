
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
    achievements?: IAchievement[]
    wins?: number,
    loses?: number,
    login?: string,
    twoFactorAuth?: boolean,
    friends?: IUser[],
    friendsRelation?: IUser[],
    friendRequests?: IUser[],
    friendRequestsRelation?: IUser[],
    createdChannles?: IChatChannel[],
    members?: IMember[],
    messages?: Message[],
}