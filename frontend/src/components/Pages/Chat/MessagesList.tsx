import { useTranslation } from "react-i18next";
import ButtonWithIcon from "../../UI/Buttons/ButtonWithIcon";
import Input from "../../UI/inputs/Input";
import MessageCard from "./MessageCard";

const MessagesList: React.FC<{
	messages: IMessage[];
	disableSend?: boolean;
	IamNotMember?: boolean;
	joinChannelHandler?: () => void;
	isProtectedChannel?: boolean;
}> = ({ messages, disableSend, IamNotMember, joinChannelHandler, isProtectedChannel }) => {
	const { t } = useTranslation();

	return (
		<div className="relative flex flex-col bg-dark-60 mt-5 rounded-2xl p-5 text-white h-[75vh] overflow-y-auto">
			<div className="overflow-auto">
				{!IamNotMember &&
					messages.map((message) => (
						<MessageCard key={message.id} message={message} />
					))}
				{!IamNotMember && messages.length === 0 && (
					<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -mt-[28px]">
						<p className="text-center text-gray-400">
							{t("chatPage.noMessages")}
						</p>
					</div>
				)}
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
					/>
					<ButtonWithIcon
						icon={
							<img
								src="/imgs/icons/muchi-muchi.png"
								alt="muchi muchi"
							/>
						} 
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
					/>}
					<ButtonWithIcon
						icon={
							<img
								src="/imgs/icons/muchi-muchi.png"
								alt="muchi muchi"
							/>
						}
						label={t("chatPage.areYouIn")}
						onClick={joinChannelHandler}
						className="bg-white text-dark-60 justify-center w-full "
					/>
				</div>
			)}
		</div>
	);
};

export default MessagesList;
