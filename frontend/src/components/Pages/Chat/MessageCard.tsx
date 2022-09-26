import moment from "moment";
import ButtonWithIcon from "../../UI/Buttons/ButtonWithIcon";
import { ReactComponent as PlayIcon } from "../../../assets/icons/play.svg";
import { ReactComponent as ShieldIcon } from "../../../assets/icons/shield.svg";
import { ReactComponent as OwnerIcon } from "../../../assets/icons/owner.svg";
import { useTranslation } from "react-i18next";
import { RolesEnum } from "../../../utils/constants/enum";
import { Link } from "react-router-dom";

const MessageCard: React.FC<{
	message: IMessage;
}> = ({ message }) => {
	const { t } = useTranslation();

	return (
		<div className="flex gap-2 mb-5">
			<Link to={`/profile/${message.from.user.id}`}>
				<img
					className="w-[50px] h-[50px] rounded-full"
					src={message.from.user.imgUrl}
					alt={message.from.user.fullName}
				/>
			</Link>
			<div className="flex flex-col justify-between">
				<div className="flex gap-2 items-center">
					<Link to={`/profile/${message.from.user.id}`}>
						<span className="font-bold">
							{message.from.user.username}
						</span>
					</Link>
					<span className="text-xs text-grey-2">
						{moment(message.date).format("MMM D, YYYY [at] HH:mm")}
					</span>
					{message.from.role &&
						message.from.role === RolesEnum.ADMIN && (
							<div className="bg-red py-[2px] px-3 rounded-2xl flex items-center gap-1">
								{" "}
								<ShieldIcon />{" "}
								<span className="text-xs">{t("roles.admin")}</span>
							</div>
						)}
					{message.from.role &&
						message.from.role === RolesEnum.OWNER && (
							<div className="bg-green py-[2px] px-3 rounded-2xl flex items-center gap-1 ">
								{" "}
								<OwnerIcon />{" "}
								<span className="text-xs">{t("roles.owner")}</span>
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
