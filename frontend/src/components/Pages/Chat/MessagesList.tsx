import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Socket } from "socket.io-client";
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
}> = ({ messages, disableSend, IamNotMember, joinChannelHandler, isProtectedChannel, onSendMessageHandler }) => {
	
	const { t } = useTranslation();

	const messageListRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (messages.length === 0) return;
		messageListRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	const [password, setPassword] = useState("");
	const [messageContent, setMessageContent] = useState("");

	const onChangeChannelPasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	const onTypeMessageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setMessageContent(e.currentTarget.value);
	};

	const sendMessageHandler = () => {
		if (messageContent.trim() === "") return;
		onSendMessageHandler(messageContent);
		setMessageContent("");
	}

	return (
		<div className="relative flex flex-col bg-dark-60 mt-5 rounded-2xl p-5 text-white h-[75vh] overflow-y-auto">
			<div className="overflow-auto">
				{!IamNotMember &&
					messages.map((message, index) => (
						<MessageCard key={index} message={message} />
					))}
				{!IamNotMember && messages.length === 0 && (
					<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -mt-[28px]">
						<p className="text-center text-gray-400">
							{t("chatPage.noMessages")}
						</p>
					</div>
				)}
				{!IamNotMember && messages.length > 0 && <div ref={messageListRef} /> }
			</div>
			{IamNotMember && (
				<video className="h-full" loop autoPlay>
					<source
						src="/imgs/gif/one-piece-happy.mp4"
						type="video/mp4"
					/>
				</video>
			)}
			{!IamNotMember && !disableSend && (
				<div className="mt-auto flex gap-4">
					<Input
						type="text"
						placeholder={t("chatPage.typeMessage")}
						onChange={onTypeMessageHandler}
						value={messageContent}
					/>
					<ButtonWithIcon
						icon={
							<img
								src="/imgs/icons/muchi-muchi.png"
								alt="muchi muchi"
							/>
						}
						onClick={sendMessageHandler}
						label={t("send")}
						className="bg-white text-dark-60 !rounded-lg"
					/>
				</div>
			)}
			{IamNotMember && (
				<div className="mt-auto flex gap-4">
					{isProtectedChannel && <Input
						type="password"
						placeholder={t("chatPage.typeChannelPassword")}
						onChange={onChangeChannelPasswordHandler}
						value={password}
					/>}
					<ButtonWithIcon
						icon={
							<img
								src="/imgs/icons/muchi-muchi.png"
								alt="muchi muchi"
							/>
						}
						label={t("chatPage.areYouIn")}
						onClick={joinChannelHandler?.bind(null, password)}
						className="bg-white text-dark-60 justify-center w-full "
					/>
				</div>
			)}
		</div>
	);
};

export default MessagesList;
