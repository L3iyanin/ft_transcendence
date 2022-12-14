import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Socket } from "socket.io-client";
import { cancelInvitation } from "../../../services/chat/chat";
import { ChannleTypesEnum, MemberStatusEnum } from "../../../utils/constants/enum";
import ButtonWithIcon from "../../UI/Buttons/ButtonWithIcon";
import Counterdown from "../../UI/Countdown";
import ErrorAlert, { ErrorAlertWithMessage } from "../../UI/Error";
import Input from "../../UI/inputs/Input";
import SuccesAlert from "../../UI/SuccesAlert";
import MessageCard from "./MessageCard";

const MessagesList: React.FC<{
	messages: IMessage[];
	disableSend?: boolean;
	IamNotMember?: boolean;
	userId?: number;
	joinChannelHandler?: (password:string) => void;
	isProtectedChannel?: boolean;
	onSendMessageHandler: (message: string) => void;
	currentChannel: IChatChannel;
	onCompleteCountdownHandler: () => void;
	userStatus: {
		status: MemberStatusEnum;
		untill: Date;
		isBanned: boolean;
		isMuted: boolean;
	};
	onCancelInvitationHandler: (matchId: number) => void;
}> = ({
	messages,
	disableSend,
	IamNotMember,
	joinChannelHandler,
	isProtectedChannel,
	onSendMessageHandler,
	currentChannel,
	userStatus,
	onCompleteCountdownHandler,
	userId,
	onCancelInvitationHandler
}) => {
	const { t } = useTranslation();

	const messageListRef = useRef<HTMLDivElement>(null);

	// const userData: IUserState = useSelector((state: any) => state.user);

	// useEffect(() => {
	// 	if (messages.length === 0) return;
	// 	messageListRef.current?.scrollIntoView({ behavior: "smooth" });
	// }, [messages]);

	useEffect(() => {
		if (messageListRef.current) {
			const lastItem = messageListRef.current.lastElementChild;
			if (lastItem) {
			lastItem.scrollIntoView({ behavior: "smooth", block: "nearest" });
			}
		}
	  }, [messages]);

	const [password, setPassword] = useState("");
	const [messageContent, setMessageContent] = useState("");

	const onChangeChannelPasswordHandler = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		setPassword(e.target.value);
	};

	const onTypeMessageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setMessageContent(e.currentTarget.value);
	};

	const sendMessageHandler = () => {
		if (messageContent.trim() === "") return;
		onSendMessageHandler(messageContent);
		setMessageContent("");
	};

	const clientSocket: Socket = useSelector(
		(state: any) => state.chat.clientSocket
	);

	const onAcceptInvitationHandler = (message: IMessage) => {
		clientSocket.emit("joinGame", {
				userId: userId,
				scoreToWin: message.scoreToWin,
				invite: true,
				inviterUserId: message.inviterId,
				invitedUserId: message.invitedId,
				matchId: message.matchId
		});
	}

	return (
		<div className="relative flex flex-col bg-dark-60 mt-5 rounded-2xl p-5 text-white h-[75vh] overflow-y-auto">
			<div className="overflow-auto" ref={messageListRef}>
				{!IamNotMember &&
					messages.map((message, index) => (
						<MessageCard
							key={index}
							message={message}
							userId={userId}
							acceptInvitation={onAcceptInvitationHandler}
							cancelInvitation={onCancelInvitationHandler}
							/>
					))}
				{!IamNotMember && messages.length === 0 && <MessageNotFound />}
				{/* {!IamNotMember && messages.length > 0 && (
					<div ref={messageListRef} />
				)} */}
			</div>

			{IamNotMember && <NoMemberInChannel />}
			{!IamNotMember && !disableSend && !userStatus?.isBanned && !userStatus?.isMuted && (
				<SendMessageInputAndBtn
					onTypeMessageHandler={onTypeMessageHandler}
					sendMessageHandler={sendMessageHandler}
					messageContent={messageContent}
				/>
			)}

			{!IamNotMember && userStatus?.isBanned && (
				<div className="mt-auto py-2 rounded-lg flex justify-between items-center border px-5 bg-red">
					<p className="text-center text-white">
						{t("chatPage.youAreBanned")}
					</p>
					{currentChannel.status !== "DM" && <Counterdown onComplete={onCompleteCountdownHandler} date={new Date(userStatus?.untill!)} /> }
				</div>
			)}

			{!IamNotMember && userStatus?.isMuted && (
				<div className="mt-auto py-2 rounded-lg !text-black flex justify-between items-center border px-5 bg-yellow border-black">
					<p className="text-center">{t("chatPage.youAreMuted")}</p>
					<Counterdown onComplete={onCompleteCountdownHandler} date={new Date(userStatus?.untill!)} />
				</div>
			)}

			{IamNotMember && (
				<JoinChannelInputs
					joinChannelHandler={joinChannelHandler!}
					onChangeChannelPasswordHandler={
						onChangeChannelPasswordHandler
					}
					password={password}
					isProtectedChannel={isProtectedChannel!}
				/>
			)}
		</div>
	);
};

export default MessagesList;

const MessageNotFound: React.FC = () => {
	const { t } = useTranslation();

	return (
		<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -mt-[28px]">
			<p className="text-center text-gray-400">
				{t("chatPage.noMessages")}
			</p>
		</div>
	);
};

const NoMemberInChannel: React.FC = () => {
	const { t } = useTranslation();

	return (
		<video className="h-full" loop autoPlay>
			<source src="/imgs/gif/one-piece-happy.mp4" type="video/mp4" />
		</video>
	);
};

const SendMessageInputAndBtn: React.FC<{
	onTypeMessageHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
	sendMessageHandler: () => void;
	messageContent: string;
}> = ({ onTypeMessageHandler, sendMessageHandler, messageContent }) => {
	const { t } = useTranslation();

	const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		sendMessageHandler();
	};

	return (
		<form className="mt-auto flex flex-wrap md:flex-nowrap md:gap-4" onSubmit={onSubmitHandler}>
			<Input
				type="text"
				className="basis-full md:basis-auto"
				placeholder={t("chatPage.typeMessage")}
				onChange={onTypeMessageHandler}
				value={messageContent}
			/>
			<ButtonWithIcon
				icon={
					<img src="/imgs/icons/muchi-muchi.png" alt="muchi muchi" />
				}
				// onClick={sendMessageHandler}
				label={t("send")}
				className="bg-white text-dark-60 !rounded-lg basis-full md:basis-auto mt-5 md:mt-0 justify-center"
			/>
		</form>
	);
};

const JoinChannelInputs: React.FC<{
	isProtectedChannel: boolean;
	onChangeChannelPasswordHandler: (
		e: React.ChangeEvent<HTMLInputElement>
	) => void;
	password: string;
	joinChannelHandler: (password: string) => void;
}> = ({
	isProtectedChannel,
	onChangeChannelPasswordHandler,
	password,
	joinChannelHandler,
}) => {
	const { t } = useTranslation();

	const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		joinChannelHandler(password);
	};

	return (
		<form className="mt-auto flex gap-4" onSubmit={onSubmitHandler}>
			{isProtectedChannel && (
				<Input
					type="password"
					placeholder={t("chatPage.typeChannelPassword")}
					onChange={onChangeChannelPasswordHandler}
					value={password}
				/>
			)}
			<ButtonWithIcon
				icon={
					<img src="/imgs/icons/muchi-muchi.png" alt="muchi muchi" />
				}
				label={t("chatPage.areYouIn")}
				// onClick={joinChannelHandler?.bind(null, password)}
				className="bg-white text-dark-60 justify-center w-full "
			/>
		</form>
	);
};
