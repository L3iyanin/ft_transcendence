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
import { useEffect, useState } from "react";
import useBotChannel from "../../../hooks/useBotChannel";
import CreateChannelPopup from "./CreateChannelPopup";
import { getChannelMessages, getChannels } from "../../../services/chat/chat";

const DiscussionSection: React.FC = () => {

	const [openCreateChannel, setOpenCreateChannel] = useState(false);

	const [channelsOfDms, setChannelsOfDms] = useState<IChatChannel[]>([]);
	const [channelsOfGroups, setChannelsOfGroups] = useState<IChatChannel[]>([]);

	const botChannel = useBotChannel();

	const { t } = useTranslation();

	const [activeChatOption, setActiveChatOption] = useState<ChatOptionsEnum>(
		ChatOptionsEnum.DMS
	);

	const [currentChannel, setCurrentChannel] =
		useState<IChatChannel>(botChannel);

	const onSelectDMsConversationHandler = () => {
		setActiveChatOption(ChatOptionsEnum.DMS);
		setCurrentChannel(botChannel);
	};

	const onSelectChannelsConversationHandler = () => {
		setActiveChatOption(ChatOptionsEnum.CHANNELS);
		setCurrentChannel(_ => {
			return {
				...botChannel,
				status: ChannleTypesEnum.CHANNEL_BOT,
			}
		});
	};

	const onSelectConversationHandler = (channel: IChatChannel) => {
		getChannelMessages(channel.id)
		.then((res) => {
				console.log(res);
				setCurrentChannel(_ => {
					const newChannel = {
						...channel,
						messages: res.messages,
					}
					return newChannel;
				});
			})
			.catch((err) => {
				console.error(err);
			});
		console.log(channel);
	};

	const onOpenCreateChannelHandler = () => {
		setOpenCreateChannel(true);
	};

	useEffect(() => {
		getChannels()
			.then((res) => {
				const allChannels = res.channels;
				const dms:IChatChannel[] = [];
				const groups:IChatChannel[] = [];

				for (let i = 0; i < allChannels.length; i++) {
					if (allChannels[i].type === ChannleTypesEnum.DM) {
						dms.push({...allChannels[i], status: allChannels[i].type});
					} else {
						groups.push({...allChannels[i], status: allChannels[i].type});
					}
				}

				setChannelsOfDms(dms);
				setChannelsOfGroups(groups);

			})
			.catch((err) => {
				console.error(err);
			});
	}, []);

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
					channels={activeChatOption === ChatOptionsEnum.DMS ? channelsOfDms : channelsOfGroups}
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
