
interface IMessage {
	id: number;
    content: string;
    sender: IUser;
    Channel?: IChatChannel;
    // channelId: number;
    date: Date;
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
    messages: Message[];
    status: ChannleStatusEnum;
    password?: string;
    lastMessage?: IMessage;
	notReadMessages?: number;
}