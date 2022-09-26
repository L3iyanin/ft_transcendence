import ButtonWithIcon from "../../UI/Buttons/ButtonWithIcon";
import { ReactComponent as ProfileIcon } from "../../../assets/icons/profile.svg";
import { ReactComponent as CogIcon } from "../../../assets/icons/cog.svg";
import { ReactComponent as PlayIcon } from "../../../assets/icons/play.svg";
import { ReactComponent as AddIcon } from "../../../assets/icons/add.svg";
import { useTranslation } from "react-i18next";
import { ChannleTypesEnum } from "../../../utils/constants/enum";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { IamAdminOrOwner } from "../../../utils/helper/chat";
import { ReactComponent as LeaveIcon } from "../../../assets/icons/leave.svg";

const ChatActions: React.FC<{
	currentChannel: IChatChannel;
	username?: string;
	userId?: number;
	onOpenCreateChannelHandler: () => void;
	IamNotMember?: boolean;
	leaveChannelHandler: () => void;
}> = ({
	currentChannel,
	username,
	userId,
	onOpenCreateChannelHandler,
	IamNotMember,
	leaveChannelHandler,
}) => {
	const { t } = useTranslation();

	const navigate = useNavigate();

	const navigateToChannelSettingsHandler = () => {
		navigate(`/channel/${currentChannel.id}/settings`);
	};

	const LocalUserData = useSelector((state: any) => state.user.user);

	const seeProfile = () => {
		if (userId) {
			navigate(`/profile/${userId}`);
		}
	}

	return (
		<div className="flex justify-between">
			<div className="flex items-center gap-3 bg-dark-60 rounded-2xl py-2 px-6">
				<img
					className="rounded-full w-[38px] h-[38px]"
					src={currentChannel.imgUrl}
					alt={currentChannel.name}
				/>

				{currentChannel.status === ChannleTypesEnum.DM && (
					<Link to={`/profile/${userId}`}>
						<span className="text-grey-2 font-bold">
							@{username ? username : currentChannel.name}
						</span>
					 </Link>
				)}

				{currentChannel.status !== ChannleTypesEnum.DM && (
					<span className="text-grey-2 font-bold">
						{currentChannel.name}
					</span>
				)}
			</div>
			<div className="flex gap-4">
				{currentChannel.status === ChannleTypesEnum.DM && (
					<>
						<ButtonWithIcon
							className="bg-yellow"
							icon={<ProfileIcon className=" stroke-dark-60" />}
							label={t("chatPage.seeProfile")}
							onClick={seeProfile}
						/>
						<ButtonWithIcon
							className="bg-red text-white"
							icon={<PlayIcon />}
							label={t("chatPage.inviteToPlay")}
						/>
					</>
				)}

				{!IamNotMember &&
					IamAdminOrOwner(
						currentChannel.members,
						LocalUserData.id
					) === true &&
					currentChannel.status !== ChannleTypesEnum.DM_BOT &&
					currentChannel.status !== ChannleTypesEnum.CHANNEL_BOT &&
					currentChannel.status !== ChannleTypesEnum.DM && (
						<ButtonWithIcon
							className="bg-yellow"
							icon={<CogIcon className=" " />}
							onClick={navigateToChannelSettingsHandler}
							label={t("chatPage.channelSettings")}
						/>
					)}

				{currentChannel.status !== ChannleTypesEnum.DM &&
					currentChannel.status !== ChannleTypesEnum.DM_BOT && (
						<ButtonWithIcon
							className="bg-green text-white"
							onClick={onOpenCreateChannelHandler}
							icon={<AddIcon />}
							label={t("chatPage.createChannel")}
						/>
					)}

				{!IamNotMember &&
					!IamAdminOrOwner(
						currentChannel.members,
						LocalUserData.id
					) === true &&
					currentChannel.status !== ChannleTypesEnum.DM_BOT &&
					currentChannel.status !== ChannleTypesEnum.CHANNEL_BOT &&
					currentChannel.status !== ChannleTypesEnum.DM && (
						<ButtonWithIcon
							className="bg-red text-white"
							icon={<LeaveIcon className="w-5 h-5" />}
							onClick={leaveChannelHandler}
							label={t("channelSettings.leaveChannel")}
						/>
					)}
			</div>
		</div>
	);
};

export default ChatActions;
