
interface IMessage {
	id: number;
    content: string;
    from: IMember;
    Channel?: IChatChannel;
    // channelId: number;
    date: Date;
	invite?: boolean;
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
	uneadMessages?: number;
	IamNotMember?: boolean;
	isProtectedChannel?: boolean;
}

