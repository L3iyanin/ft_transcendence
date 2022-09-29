import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { getChannels } from "../../../services/chat/chat";
import {
	ChannleTypesEnum,
	ChatOptionsEnum,
} from "../../../utils/constants/enum";
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

	const onlineUsers: IOnlineUser[] = useSelector(
		(state: any) => state.chat.onlineUsers
	);

	const onSelectConversationHandler = (channel: IChatChannel) => {
		onSelectConversation(channel);
	};

	return (
		<div className="relative bg-dark-60 mt-5 rounded-2xl p-5 text-white xl:h-full mb-10 xl:mb-0 max-h-[75vh] overflow-y-auto">
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
							<ConversationCard
								channel={channel}
								onClick={onSelectConversationHandler}
								isOnline={isUserOnline(
									channel.name,
									onlineUsers
								)}
							/>
							{index !== channels.length - 1 && <RoundedHr />}
						</div>
					);
				})}
				{channels.length === 0 && (
					<div className="text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-400">
						{t("chatPage.noChannels")}
					</div>
				)}
			</div>
		</div>
	);
};

export default ConversationsList;

const isUserOnline = (name: string, onlineUsers: IOnlineUser[]): boolean => {
	return onlineUsers.some(
		(userData) =>
			userData.user.fullName.toLocaleLowerCase() ===
			name.toLocaleLowerCase()
	);
};
