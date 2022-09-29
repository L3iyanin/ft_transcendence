import moment from "moment";
import ButtonWithIcon from "../../UI/Buttons/ButtonWithIcon";
import { ReactComponent as PlayIcon } from "../../../assets/icons/play.svg";
import { ReactComponent as ShieldIcon } from "../../../assets/icons/shield.svg";
import { ReactComponent as OwnerIcon } from "../../../assets/icons/owner.svg";
import { ReactComponent as InvalidIcon } from "../../../assets/icons/invalid.svg";
import { useTranslation } from "react-i18next";
import { RolesEnum } from "../../../utils/constants/enum";
import { Link } from "react-router-dom";
import { ReactComponent as LeaveIcon } from "../../../assets/icons/leave.svg";

const MessageCard: React.FC<{
	message: IMessage;
	userId?: number;
	acceptInvitation: (message: IMessage) => void;
	cancelInvitation: (matchId: number) => void;
}> = ({ message, userId, acceptInvitation, cancelInvitation }) => {

	const { t } = useTranslation();

	return (
		<div className="flex gap-2 mb-5">
			<Link to={`/profile/${message.from.user.id}`}>
				<img
					className="min-w-[50px] min-h-[50px] max-w-[50px] max-h-[50px] rounded-full"
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
						{moment(message.createdAt).format("MMM D, YYYY [at] HH:mm")}
					</span>
					{message.from.role &&
						message.from.role === RolesEnum.ADMIN && (
							<div className="bg-red py-[2px] px-3 rounded-2xl flex items-center gap-1">
								{" "}
								<ShieldIcon />{" "}
								<span className="text-xs">
									{t("roles.admin")}
								</span>
							</div>
						)}
					{message.from.role &&
						message.from.role === RolesEnum.OWNER && (
							<div className="bg-green py-[2px] px-3 rounded-2xl flex items-center gap-1 ">
								{" "}
								<OwnerIcon />{" "}
								<span className="text-xs">
									{t("roles.owner")}
								</span>
							</div>
						)}
				</div>
				{!message.invite && <p className="break-all">{message.content}</p>}
				{message.invite && (
					<InviteMessageCard
						message={message}
						userId={userId}
						acceptInvitation={acceptInvitation}
						cancelInvitation={cancelInvitation}
						/>
				)}
			</div>
		</div>
	);
};

export default MessageCard;

const InviteMessageCard: React.FC<{
	message: IMessage;
	userId?: number;
	acceptInvitation: (message: IMessage) => void;
	cancelInvitation: (matchId: number) => void;
}> = ({ message, userId, acceptInvitation, cancelInvitation }) => {
	const { t } = useTranslation();

	if (message.inviterId !== userId) {
		return (
			<div className="flex gap-4 items-center">
				<p>{t("pongInvitation")}</p>
				{
					message.validInvitation !== false ?
						<>
							<ButtonWithIcon
								icon={<PlayIcon />}
								label={t("chatPage.playNow")}
								className="!py-1 rounded-lg px-3 bg-green"
								onClick={acceptInvitation.bind(null, message)}
							/>
							<ButtonWithIcon
								icon={<LeaveIcon className="w-4 h-4" />}
								label={t("chatPage.cancelInvite")}
								className="!py-1 rounded-lg px-3 bg-red"
								onClick={cancelInvitation.bind(null, message.matchId!)}
							/>
						</>
						:
						<ButtonWithIcon
							icon={<InvalidIcon />}
							isDisabled={true}
							label={t("chatPage.invalidInvite")}
							className="!py-1 rounded-lg px-3 bg-dark-blue text-xs"
						/>
				}
			</div>
		);
	}

	return (
		<div className="flex gap-4 items-center">
			<p>{t("pongInviter")}</p>
			{
					message.validInvitation !== false ?
					<ButtonWithIcon
						icon={<LeaveIcon className="w-4 h-4" />}
						label={t("chatPage.cancelInvite")}
						className="!py-1 rounded-lg px-3 bg-red"
						onClick={cancelInvitation.bind(null, message.matchId!)}
					/>
					:
						<ButtonWithIcon
							icon={<InvalidIcon />}
							isDisabled={true}
							label={t("chatPage.invalidInvite")}
							className="!py-1 rounded-lg px-3 bg-dark-blue text-xs"
						/>
			}
		</div>
	);
};
