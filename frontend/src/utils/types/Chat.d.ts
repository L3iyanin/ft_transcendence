
interface IMessage {
	id: number;
    content: string;
    from: IMember;
    date: Date;
	createdAt: Date;
    Channel?: IChatChannel;
    // channelId: number;
	invite?: boolean;
	invitedId?: number;
	inviterId?: number;
	matchId?: number;
	scoreToWin?: number;
	validInvitation?: boolean;
}

interface IMember {
	id: number;
    user: IUser;
    status?: MemberStatusEnum;
    until?: Date;
    role?: RolesEnum;
    // Channel: IChatChannel;
}

interface IChatChannel {
	id: number;
    name: string;
	imgUrl: string;
    owner?: number;
    members: IMember[];
    messages: IMessage[];
    status: ChannleTypesEnum;
    password?: string;
    lastMessage?: IMessage;
	unreadMessages: number | null;
	IamNotMember?: boolean;
	isProtectedChannel?: boolean;
}

