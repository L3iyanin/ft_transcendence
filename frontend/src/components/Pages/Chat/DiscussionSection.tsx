import InputWithIcon from "../../UI/inputs/InputWithIcon";
import ChatActions from "./ChatActions";
import ConversationsList from "./ConversationsList";
import MessagesList from "./MessagesList";
import { ReactComponent as SearchIcon } from "../../../assets/icons/Search.svg";
import { dmChannels, GroupChannels } from "../../../utils/data/Chat";
import { useTranslation } from "react-i18next";
import {
	ChannleTypesEnum,
	ChatOptionsEnum,
	MemberStatusEnum,
} from "../../../utils/constants/enum";
import { useEffect, useRef, useState } from "react";
import useBotChannel from "../../../hooks/useBotChannel";
import CreateChannelPopup from "./CreateChannelPopup";
import {
	cancelInvitation,
	getChannelMessages,
	getChannels,
	joinChannel,
} from "../../../services/chat/chat";
import ErrorAlert, { ErrorAlertWithMessage } from "../../UI/Error";
import { leaveChannel } from "../../../services/channel/settings";
import SuccesAlert from "../../UI/SuccesAlert";
import { useDispatch, useSelector } from "react-redux";
import { Socket } from "socket.io-client";
import { resetNotifications } from "../../../reducers/ChatSlice";

const DiscussionSection: React.FC = () => {
	const [openCreateChannel, setOpenCreateChannel] = useState(false);
	const [refresh, setRefresh] = useState(false);
	const [channelsOfDms, setChannelsOfDms] = useState<IChatChannel[]>([]);
	const [channelsOfGroups, setChannelsOfGroups] = useState<IChatChannel[]>(
		[]
	);

	const [visibleChannels, setVisibleChannels] = useState<IChatChannel[]>([]);

	const clientSocket: Socket = useSelector(
		(state: any) => state.chat.clientSocket
	);

	const userData: IUserState = useSelector((state: any) => state.user);

	const botChannel = useBotChannel();

	const { t } = useTranslation();

	const [activeChatOption, setActiveChatOption] = useState<ChatOptionsEnum>(
		ChatOptionsEnum.DMS
	);

	const [currentChannel, setCurrentChannel] =
		useState<IChatChannel>(botChannel);

	const searchInputRef = useRef<HTMLInputElement>(null);

	const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		const searchValue = e.target.value;
		if (visibleChannels) {
			const channels =
				activeChatOption == ChatOptionsEnum.DMS
					? channelsOfDms
					: channelsOfGroups;
			setVisibleChannels(
				channels.filter((channel) => {
					return channel.name
						.toLowerCase()
						.includes(searchValue.toLowerCase());
				})
			);
		}
	};

	useEffect(() => {
		if (activeChatOption == ChatOptionsEnum.DMS) {
			setVisibleChannels(channelsOfDms);
		} else {
			setVisibleChannels(channelsOfGroups);
		}
		searchInputRef.current!.value = "";
	}, [activeChatOption, channelsOfDms, channelsOfGroups]);

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
				setCurrentChannel((_) => {
					const newChannel = {
						...channel,
						messages: res.messages,
						members: res.members,
					};
					return newChannel;
				});
				// remove the unread messages count
				setChannelsOfDms((channels) => {
					const newChannels = [...channels];
					const index = newChannels.findIndex(
						(singleChannel) => singleChannel.id === channel.id
					);

					if (index !== -1) {
						newChannels[index].unreadMessages = 0;
					}

					return newChannels;
				});
			})
			.catch((err) => {
				console.error(err.response.status);
				if (err.response.status === 401) {
					ErrorAlertWithMessage(t("chatPage.notMemberOfChannel"));

					setCurrentChannel((_) => {
						const newChannel = {
							...channel,
							messages: [],
							IamNotMember: true,
							isProtectedChannel:
								channel.status === ChannleTypesEnum.PROTECTED,
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
				setVisibleChannels(dms);
			})
			.catch((err) => {
				console.error(err);
				ErrorAlert(err);
			});
	}, [refresh]);

	const joinChannelHandler = (password?: string) => {
		joinChannel(currentChannel.id, password)
			.then((res) => {
				return getChannelMessages(currentChannel.id);
			})
			.then((res) => {
				setCurrentChannel((_) => {
					const newChannel = {
						...currentChannel,
						IamNotMember: false,
						messages: res.messages,
						members: res.members,
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
					console.error(err);
					ErrorAlert(err);
				});
		}
	};

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(resetNotifications());
	}, [])

	useEffect(() => {
		if (!clientSocket) return;
		clientSocket.on("receivedMessage", (message: any) => {
			setCurrentChannel((channelInfo) => {
				if (message.isDm) {
					setChannelsOfDms((channels) => {
						const newChannels = [...channels];
						const index = newChannels.findIndex(
							(channel) => channel.id === message.channelId
						);
						if (index !== -1) {
							newChannels[index].lastMessage = message;
							if (message.channelId !== channelInfo.id) {
								if (!newChannels[index].unreadMessages) {
									newChannels[index].unreadMessages = 0;
								}
								newChannels[index].unreadMessages! += 1;
							}
						}
						return newChannels;
					});
				}

				if (message.channelId === channelInfo.id) {
					const newChannel = {
						...channelInfo,
						messages: [...channelInfo.messages, message],
					};
					return newChannel;
				}

				return channelInfo;
			});
		});
	}, [clientSocket]);

	const onSendMessageHandler = (messageContent: string) => {
		clientSocket.emit("sendMessage", {
			isDm: activeChatOption === ChatOptionsEnum.DMS,
			channelId: currentChannel.id,
			channelName: currentChannel.name,
			userId: userData.user?.id,
			content: messageContent,
		});

		// add message to current channel
		setCurrentChannel((channelInfo) => {
			const getCurrentMember: IMember = channelInfo.members.find(
				(member) => member.user.id === userData.user?.id
			)!;
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

		if (activeChatOption === ChatOptionsEnum.DMS) {
			// add message to dms channel
			setChannelsOfDms((channels) => {
				const newChannels = [...channels];
				const index = newChannels.findIndex(
					(channel) => channel.id === currentChannel.id
				);
				if (index !== -1) {
					newChannels[index].lastMessage = {
						id: 1,
						from: {
							id: userData.user?.id!,
							user: {
								id: userData.user?.id!,
								username: userData.user?.username!,
								fullName: userData.user?.fullName!,
								imgUrl: userData.user?.username!,
							},
						},
						content: messageContent,
						date: new Date(),
					};
				}
				return newChannels;
			});
		}
	};

	const [userStatus, setUserStatus] = useState<{
		status: MemberStatusEnum;
		untill: Date;
		isBanned: boolean;
		isMuted: boolean;
	}>({
		status: MemberStatusEnum.NONE,
		untill: new Date(),
		isBanned: false,
		isMuted: false,
	});

	useEffect(() => {
		let currentMember;

		if (userData.user) {
			currentMember = currentChannel.members.find((member) => {
				return member.user.id === userData.user?.id;
			});
		}

		if (currentMember?.status === MemberStatusEnum.BANNED) {
			setUserStatus({
				status: MemberStatusEnum.BANNED,
				untill: new Date(currentMember?.until!),
				isBanned: true,
				isMuted: false,
			});
		}
		else if (currentMember?.status === MemberStatusEnum.MUTED) {
			setUserStatus({
				status: MemberStatusEnum.MUTED,
				untill: new Date(currentMember?.until!),
				isBanned: false,
				isMuted: true,
			});
		}
		else {
			setUserStatus({
				status: MemberStatusEnum.NONE,
				untill: new Date(),
				isBanned: false,
				isMuted: false,
			});
		}

	}, [currentChannel]);

	const getNewChannelMessages = (channelId: string) => {
		getChannelMessages(+channelId)
		.then((res) => {
			setCurrentChannel((prevCurrChannel) => {
				const newChannel = {
					...prevCurrChannel,
					messages: res.messages,
					members: res.members,
					// ...res
				};
				return newChannel;
			});
		})
	}

	useEffect(() => {
		if (!clientSocket) return;

		clientSocket.on("youbAreBlocked", (userBanned) => {
			ErrorAlertWithMessage(userBanned.error);
			setUserStatus({
				status: MemberStatusEnum.BANNED,
				untill: new Date(userBanned.until!),
				isBanned: true,
				isMuted: false,
			});

			getNewChannelMessages(userBanned.channelId);
		});
		
		clientSocket.on("youAreMuted", (userMuted) => {
			ErrorAlertWithMessage(userMuted.error);
			setUserStatus({
				status: MemberStatusEnum.MUTED,
				untill: new Date(userMuted.until!),
				isBanned: false,
				isMuted: true,
			});

			getNewChannelMessages(userMuted.channelId);
		});
	}, [clientSocket]);


	const onCompleteCountdownHandler = () => {
		setUserStatus({
			status: MemberStatusEnum.NONE,
			untill: new Date(),
			isBanned: false,
			isMuted: false,
		});
		getNewChannelMessages(currentChannel.id.toString());
	};


	const onCancelInvitationHandler = (matchId: number) => {
		cancelInvitation(matchId)
			.then((res) => {
				SuccesAlert(res.message);
				getNewChannelMessages(currentChannel.id.toString());
			})
			.catch((err) => {
				console.error(err);
				ErrorAlert(err);
			});
	}

	return (
		<div className="flex flex-wrap">
			<CreateChannelPopup
				open={openCreateChannel}
				setOpen={setOpenCreateChannel}
				onRefreshHandler={onRefreshHandler}
			/>
			<div className="xl:basis-1/3 basis-full xl:pr-4">
				<InputWithIcon
					icon={<SearchIcon />}
					type="text"
					placeholder={t("search")}
					onChange={searchHandler}
					ref={searchInputRef}
				/>
				<ConversationsList
					activeChatOption={activeChatOption}
					channels={visibleChannels}
					onSelectDMsConversation={onSelectDMsConversationHandler}
					onSelectChannelsConversation={
						onSelectChannelsConversationHandler
					}
					onSelectConversation={onSelectConversationHandler}
				/>
			</div>
			<div className="xl:basis-2/3 basis-full xl:pl-4">
				<ChatActions
					currentChannel={currentChannel}
					username={
						currentChannel.members[0].user.id === userData.user?.id
							? currentChannel.members.length > 1 ? currentChannel.members[1].user.username : undefined
							: currentChannel.members[0].user.username
					}
					friendId={
						currentChannel.members[0].user.id === userData.user?.id
							? currentChannel.members.length > 1 ? currentChannel.members[1].user.id : undefined
							: currentChannel.members[0].user.id
					}
					userId={userData.user?.id}
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
					currentChannel={currentChannel}
					userStatus={userStatus}
					userId={userData.user?.id}
					onCompleteCountdownHandler={onCompleteCountdownHandler}
					onCancelInvitationHandler={onCancelInvitationHandler}
				/>
			</div>
		</div>
	);
};

export default DiscussionSection;
