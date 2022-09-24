import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Socket } from "socket.io-client";
import { MemberStatusEnum } from "../../../utils/constants/enum";
import ButtonWithIcon from "../../UI/Buttons/ButtonWithIcon";
import Input from "../../UI/inputs/Input";
import MessageCard from "./MessageCard";

const MessagesList: React.FC<{
	messages: IMessage[];
	disableSend?: boolean;
	IamNotMember?: boolean;
	joinChannelHandler?: () => void;
	isProtectedChannel?: boolean;
	onSendMessageHandler: (message: string) => void;
	currentChannel: IChatChannel;
}> = ({
	messages,
	disableSend,
	IamNotMember,
	joinChannelHandler,
	isProtectedChannel,
	onSendMessageHandler,
	currentChannel,
}) => {
	const { t } = useTranslation();

	const messageListRef = useRef<HTMLDivElement>(null);

	const userData: IUserState = useSelector((state: any) => state.user);

	useEffect(() => {
		if (messages.length === 0) return;
		messageListRef.current?.scrollIntoView({ behavior: "smooth" });
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

	const getCurrentMember = () => {
		if (userData.user) {
			return currentChannel.members.find((member) => {
				return member.user.id === userData.user?.id;
			});
		}
	};

	const currentMember = getCurrentMember();

	console.log(currentMember);

	const IamBanned = currentMember?.status === MemberStatusEnum.BANNED;
	const IamMuted = currentMember?.status === MemberStatusEnum.MUTED;

	return (
		<div className="relative flex flex-col bg-dark-60 mt-5 rounded-2xl p-5 text-white h-[75vh] overflow-y-auto">
			<div className="overflow-auto">
				{!IamNotMember &&
					messages.map((message, index) => (
						<MessageCard key={index} message={message} />
					))}
				{!IamNotMember && messages.length === 0 && <MessageNotFound />}
				{!IamNotMember && messages.length > 0 && (
					<div ref={messageListRef} />
				)}
			</div>
			{IamNotMember && <NoMemberInChannel />}
			{!IamNotMember && !disableSend && !IamBanned && !IamMuted && (
				<SendMessageInputAndBtn
					onTypeMessageHandler={onTypeMessageHandler}
					sendMessageHandler={sendMessageHandler}
					messageContent={messageContent}
				/>
			)}

			{ !IamNotMember && IamBanned && (
				<div className="bg-red mt-auto py-2 rounded-lg flex flex-col items-center justify-center">
					<p className="text-center text-white">
						{t("chatPage.youAreBanned")}
					</p>
				</div>
			)}


			{ !IamNotMember && IamMuted && (
				<div className="bg-yellow mt-auto py-2 rounded-lg flex flex-col items-center justify-center">
					<p className="text-center text-black">
						{t("chatPage.youAreMuted")}
					</p>
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
		<form className="mt-auto flex gap-4" onSubmit={onSubmitHandler}>
			<Input
				type="text"
				placeholder={t("chatPage.typeMessage")}
				onChange={onTypeMessageHandler}
				value={messageContent}
			/>
			<ButtonWithIcon
				icon={
					<img src="/imgs/icons/muchi-muchi.png" alt="muchi muchi" />
				}
				onClick={sendMessageHandler}
				label={t("send")}
				className="bg-white text-dark-60 !rounded-lg"
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
				onClick={joinChannelHandler?.bind(null, password)}
				className="bg-white text-dark-60 justify-center w-full "
			/>
		</form>
	);
};
