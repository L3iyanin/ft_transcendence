import InputWithIcon from "../../UI/inputs/InputWithIcon";
import ChatActions from "./ChatActions";
import ConversationsList from "./ConversationsList";
import MessagesList from "./MessagesList";
import { ReactComponent as SearchIcon } from "../../../assets/icons/search.svg";
import { dmChannels, GroupChannels } from "../../../utils/data/Chat";
import { useTranslation } from "react-i18next";
import {
	ChannleTypesEnum,
	ChatOptionsEnum,
} from "../../../utils/constants/enum";
import { useState } from "react";
import useBotChannel from "../../../hooks/useBotChannel";
import CreateChannelPopup from "./CreateChannelPopup";

const DiscussionSection: React.FC = () => {

	const [openCreateChannel, setOpenCreateChannel] = useState(false);

	const botChannel = useBotChannel();

	const { t } = useTranslation();

	const [activeChatOption, setActiveChatOption] = useState<ChatOptionsEnum>(
		ChatOptionsEnum.DMS
	);
	const [channels, setChannels] = useState<IChatChannel[]>(dmChannels);
	const [currentChannel, setCurrentChannel] =
		useState<IChatChannel>(botChannel);

	const onSelectDMsConversationHandler = () => {
		setActiveChatOption(ChatOptionsEnum.DMS);
		setChannels(dmChannels);
		setCurrentChannel(botChannel);
	};

	const onSelectChannelsConversationHandler = () => {
		setActiveChatOption(ChatOptionsEnum.CHANNELS);
		setChannels(GroupChannels);
		setCurrentChannel(_ => {
			return {
				...botChannel,
				status: ChannleTypesEnum.CHANNEL_BOT,
			}
		});
	};

	const onSelectConversationHandler = (channel: IChatChannel) => {
		setCurrentChannel(channel);
	};

	const onOpenCreateChannelHandler = () => {
		setOpenCreateChannel(true);
	};

	return (
		<div className="flex gap-4">
			<CreateChannelPopup open={openCreateChannel} setOpen={setOpenCreateChannel} />
			<div className="basis-1/3">
				<InputWithIcon
					icon={<SearchIcon />}
					type="text"
					placeholder={t("search")}
				/>
				<ConversationsList
					activeChatOption={activeChatOption}
					channels={channels}
					onSelectDMsConversation={onSelectDMsConversationHandler}
					onSelectChannelsConversation={
						onSelectChannelsConversationHandler
					}
					onSelectConversation={onSelectConversationHandler}
				/>
			</div>
			<div className="basis-2/3 basis">
				<ChatActions
					currentChannel={currentChannel}
					username={currentChannel.members[0].user.username}
					onOpenCreateChannelHandler={onOpenCreateChannelHandler}
				/>
				<MessagesList
					messages={currentChannel.messages}
					disableSend={
						(currentChannel.status === ChannleTypesEnum.DM_BOT || currentChannel.status == ChannleTypesEnum.CHANNEL_BOT)
					}
				/>
			</div>
		</div>
	);
};

export default DiscussionSection;
