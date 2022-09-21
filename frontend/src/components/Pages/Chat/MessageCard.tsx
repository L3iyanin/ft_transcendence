import moment from "moment";
import ButtonWithIcon from "../../UI/Buttons/ButtonWithIcon";
import { ReactComponent as PlayIcon } from "../../../assets/icons/play.svg";
import { ReactComponent as ShieldIcon } from "../../../assets/icons/shield.svg";
import { useTranslation } from "react-i18next";
import { RolesEnum } from "../../../utils/constants/enum";

const MessageCard: React.FC<{
	message: IMessage;
}> = ({ message }) => {
	const { t } = useTranslation();

	return (
		<div className="flex gap-2 mb-5">
			<img
				className="w-[50px] h-[50px] rounded-full"
				src={message.sender.user.imgUrl}
				alt={message.sender.user.fullName}
			/>
			<div className="flex flex-col justify-between">
				<div className="flex gap-2 items-center">
					<span className="font-bold">
						{message.sender.user.username}
					</span>
					<span className="text-xs text-grey-2">
						{moment(message.date).format("MMM D, YYYY [at] HH:mm")}
					</span>
					{message.sender.role &&
						message.sender.role === RolesEnum.ADMIN && (
							<div className="bg-red py-[2px] px-3 rounded-2xl flex items-center gap-1">
								{" "}
								<ShieldIcon />{" "}
								<span className="text-xs">{t("admin")}</span>
							</div>
						)}
				</div>
				{!message.invite && <p>{message.content}</p>}
				{message.invite && (
					<div className="flex gap-4 items-center">
						<p>{t("pongInvitation")}</p>
						<ButtonWithIcon
							icon={<PlayIcon />}
							label={t("chatPage.playNow")}
							className="!py-1 rounded-lg px-3 bg-red"
						/>
					</div>
				)}
			</div>
		</div>
	);
};

export default MessageCard;
