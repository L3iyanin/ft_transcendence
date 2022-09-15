import moment from "moment";
import ButtonWithIcon from "../../UI/Buttons/ButtonWithIcon";
import { ReactComponent as PlayIcon } from "../../../assets/icons/play.svg";
import { useTranslation } from "react-i18next";

const MessageCard: React.FC<{
	message: IMessage;
}> = ({ message }) => {

	const { t } = useTranslation();

	return (
		<div className="flex gap-2 mb-5">
			<img className="w-[50px] h-[50px] rounded-full" src={message.sender.imgUrl} alt={message.sender.fullName} />
			<div className="flex flex-col justify-between">
				<div>
					<span className="font-bold">{message.sender.username}</span>
					<span className="text-xs text-grey-2 ml-2">{moment(message.date).format("MMM D, YYYY [at] HH:mm")}</span>
				</div>
				{!message.invite && <p>{message.content}</p>}
				{
					message.invite && (
						<div className="flex gap-4 items-center">
							<p>{t("pongInvitation")}</p>
							<ButtonWithIcon icon={<PlayIcon />} label="Play Now" className="!py-1 rounded-lg px-3 bg-red" />
						</div>
					)
				}
			</div>
		</div>
	);
};

export default MessageCard;