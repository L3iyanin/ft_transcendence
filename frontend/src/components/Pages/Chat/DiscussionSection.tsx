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
import {
	getChannelMessages,
	getChannels,
	joinChannel,
} from "../../../services/chat/chat";
import ErrorAlert, { ErrorAlertWithMessage } from "../../UI/Error";
import { leaveChannel } from "../../../services/channel/settings";
import SuccesAlert from "../../UI/SuccesAlert";
import { useSelector } from "react-redux";
import { Socket } from "socket.io-client";

const DiscussionSection: React.FC = () => {
	
	const [openCreateChannel, setOpenCreateChannel] = useState(false);
	const [refresh, setRefresh] = useState(false);
	const [channelsOfDms, setChannelsOfDms] = useState<IChatChannel[]>([]);
	const [channelsOfGroups, setChannelsOfGroups] = useState<IChatChannel[]>([]);

	const clientSocket: Socket = useSelector((state: any) => state.chat.clientSocket);

	const userData: IUserState = useSelector((state: any) => state.user);

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
		setCurrentChannel((_) => {
			return {
				...botChannel,
				status: ChannleTypesEnum.CHANNEL_BOT,
			};
		});
	};

	const onSelectConversationHandler = (channel: IChatChannel) => {
		getChannelMessages(channel.id)
			.then((res) => {
				// console.log(res);
				setCurrentChannel((_) => {
					const newChannel = {
						...channel,
						messages: res.messages,
					};
					return newChannel;
				});
			})
			.catch((err) => {
				console.log(err.response.status);
				if (err.response.status === 401) {
					ErrorAlertWithMessage(t("chatPage.notMemberOfChannel"));
					// console.log(channel);
					setCurrentChannel((_) => {
						const newChannel = {
							...channel,
							messages: [],
							IamNotMember: true,
							isProtectedChannel: channel.status === ChannleTypesEnum.PROTECTED,
						};
						return newChannel;
					});
				}
				console.error(err);
			});
	};

	const onOpenCreateChannelHandler = () => {
		setOpenCreateChannel(true);
	};

	const onRefreshHandler = () => {
		setRefresh((prev) => !prev);
	};

	useEffect(() => {
		getChannels()
			.then((res) => {
				const allChannels = res.channels;
				const dms: IChatChannel[] = [];
				const groups: IChatChannel[] = [];

				for (let i = 0; i < allChannels.length; i++) {
					if (allChannels[i].type === ChannleTypesEnum.DM) {
						dms.push({
							...allChannels[i],
							status: allChannels[i].type,
						});
					} else {
						groups.push({
							...allChannels[i],
							status: allChannels[i].type,
						});
					}
				}

				setChannelsOfDms(dms);
				setChannelsOfGroups(groups);
			})
			.catch((err) => {
				console.error(err);
				ErrorAlert(err);
			});
	}, [refresh]);

	const joinChannelHandler = (password?: string) => {
		joinChannel(currentChannel.id, password)
			.then((res) => {
				console.log(res);
				return getChannelMessages(currentChannel.id)
			})
			.then((res) => {
				console.log(res);
				setCurrentChannel((_) => {
					const newChannel = {
						...currentChannel,
						IamNotMember: false,
						messages: res.messages,
					};
					return newChannel;
				});
			})
			.catch((err) => {
				console.error(err);
				ErrorAlert(err);
			}); 
	};

	const leaveChannelHandler = () => {
		if (currentChannel && currentChannel.id) {
			leaveChannel(currentChannel.id.toString())
				.then((res) => {
					SuccesAlert(res.message);
					onSelectConversationHandler(currentChannel);
				})
				.catch((err) => {
					console.log(err);
					ErrorAlert(err);
				});
		}
	}

	useEffect(() => {
		if (!clientSocket) return;
		console.log("listen on receivedMessage");
		clientSocket.on("receivedMessage", (message: any) => {
			console.log("message", message);
			setCurrentChannel((channelInfo) => {
				const newChannel = {
					...channelInfo,
					messages: [...channelInfo.messages, message],
				};
				return newChannel;
			});
		});

	}, [clientSocket])

	const onSendMessageHandler = (messageContent: string) => {
		clientSocket.emit("sendMessage", {
			isDm: activeChatOption === ChatOptionsEnum.DMS,
			channelId: currentChannel.id,
			channelName: currentChannel.name,
			userId: userData.user?.id,
			content: messageContent,
		});
		setCurrentChannel((channelInfo) => {
			const getCurrentMember:IMember = channelInfo.members.find(member => member.user.id === userData.user?.id)!;
			const newMessage: IMessage = {
				id: channelInfo.messages.length + 1,
				content: messageContent,
				from: getCurrentMember,
				date: new Date(),
			};

			const newChannel = {
				...channelInfo,
				messages: [...channelInfo.messages, newMessage],
			};
			return newChannel;
		});
	};

	return (
		<div className="flex gap-4">
			<CreateChannelPopup
				open={openCreateChannel}
				setOpen={setOpenCreateChannel}
				onRefreshHandler={onRefreshHandler}
			/>
			<div className="basis-1/3">
				<InputWithIcon
					icon={<SearchIcon />}
					type="text"
					placeholder={t("search")}
				/>
				<ConversationsList
					activeChatOption={activeChatOption}
					channels={
						activeChatOption === ChatOptionsEnum.DMS
							? channelsOfDms
							: channelsOfGroups
					}
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
					IamNotMember={currentChannel.IamNotMember}
					leaveChannelHandler={leaveChannelHandler}
				/>
				<MessagesList
					messages={currentChannel.messages}
					IamNotMember={currentChannel.IamNotMember}
					disableSend={
						currentChannel.status === ChannleTypesEnum.DM_BOT ||
						currentChannel.status == ChannleTypesEnum.CHANNEL_BOT
					}
					isProtectedChannel={currentChannel.isProtectedChannel}
					joinChannelHandler={joinChannelHandler}
					onSendMessageHandler={onSendMessageHandler}
				/>
			</div>
		</div>
	);
};

export default DiscussionSection;
