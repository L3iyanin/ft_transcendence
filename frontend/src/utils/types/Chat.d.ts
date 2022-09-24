
interface IMessage {
	id: number;
    content: string;
    from: IMember;
    date: Date;
    Channel?: IChatChannel;
    // channelId: number;
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

