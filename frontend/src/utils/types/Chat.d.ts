
interface IMessage {
	id: number;
    content: string;
    sender: number;
    Channel: IChatChannel,
    channelId: number,
    date: Date,
}

interface IMember {
	id: number;
    user: number
    status: MemberStatusEnum,
    until: Date,
    role: RolesEnum,
    Channel: IChatChannel,
    channelId: number,
}

interface IChatChannel {
	id: number;
    name: string
    owner: number;
    members: IMember[]
    messages: Message[]
    status: ChannleStatusEnum
    password: string
    lastMessagdID: IMessage
}