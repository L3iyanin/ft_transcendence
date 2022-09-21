import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { ChatOptionsEnum } from "../../../utils/constants/enum";
import RoundedHr from "../../UI/Hr/RoundedHr";
import RoundedFilter from "../../UI/RoundedFilter";
import ConversationCard from "./ConversationCard";

const ConversationsList: React.FC<{
	channels: IChatChannel[];
	activeChatOption: ChatOptionsEnum;
	onSelectDMsConversation: () => void;
	onSelectChannelsConversation: () => void;
	onSelectConversation: (channel: IChatChannel) => void;
}> = ({
	channels,
	activeChatOption,
	onSelectDMsConversation,
	onSelectChannelsConversation,
	onSelectConversation,
}) => {

	const { t } = useTranslation();

	const onlineUsers:IOnlineUser[] = useSelector((state: any) => state.chat.onlineUsers);

	const onSelectConversationHandler = (channel: IChatChannel) => {
		onSelectConversation(channel);
	};

	return (
		<div className="bg-dark-60 mt-5 rounded-2xl p-5 text-white  h-full max-h-[75vh] overflow-y-auto">
			<RoundedFilter
				firstLabel={t("chatPage.dms")}
				secondLabel={t("chatPage.channels")}
				activeOption={activeChatOption}
				onSelectFirstLabel={onSelectDMsConversation}
				onSelectSecondLabel={onSelectChannelsConversation}
			/>
			<div className="w-full mt-5">
				{channels.map((channel, index) => {
					return (
						<div key={channel.id}>
							<ConversationCard channel={channel} onClick={onSelectConversationHandler} isOnline={isUserOnline(channel.name, onlineUsers)} />
							{index !== channels.length - 1 && <RoundedHr />}
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default ConversationsList;

const isUserOnline = (name: string, onlineUsers: IOnlineUser[]): boolean => {
	return onlineUsers.some((userData) => userData.user.fullName.toLocaleLowerCase() === name.toLocaleLowerCase());
}