import { useRef } from "react";
import { useTranslation } from "react-i18next";
import ButtonWithIcon from "../../UI/Buttons/ButtonWithIcon";
import Input from "../../UI/inputs/Input";
import MessageCard from "./MessageCard";

const MessagesList: React.FC<{
	messages: IMessage[];
	disableSend?: boolean;
}> = ({ messages, disableSend }) => {

	const { t } = useTranslation();

	const messageRef = useRef<HTMLInputElement>(null);

	const onSendMessageHandler = () => {
		if (messageRef.current) {
			console.log(messageRef.current.value);
			messageRef.current.value = "";
		}
	};

	return (
		<div className="flex flex-col bg-dark-60 mt-5 rounded-2xl p-5 text-white h-[75vh] overflow-y-auto">
			<div className="overflow-auto">
				{
					messages.map((message) => (
						<MessageCard key={message.id} message={message} />
					))
				}
			</div>
			{!disableSend && <div className="mt-auto flex gap-4">
				<Input ref={messageRef} type="text" placeholder={t("chatPage.typeMessage")}  />
				<ButtonWithIcon
					icon={
						<img
							src="/imgs/icons/muchi-muchi.png"
							alt="muchi muchi"
						/>
					}
					label={t("send")}
					className="bg-white text-dark-60 !rounded-lg"
					onClick={onSendMessageHandler}
				/>
			</div>}
		</div>
	);
};

export default MessagesList;
