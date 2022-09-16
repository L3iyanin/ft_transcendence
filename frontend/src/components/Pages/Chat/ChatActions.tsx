import ButtonWithIcon from "../../UI/Buttons/ButtonWithIcon";
import { ReactComponent as ProfileIcon } from "../../../assets/icons/profile.svg";
import { ReactComponent as CogIcon } from "../../../assets/icons/cog.svg";
import { ReactComponent as PlayIcon } from "../../../assets/icons/play.svg";
import { ReactComponent as AddIcon } from "../../../assets/icons/add.svg";
import { useTranslation } from "react-i18next";
import { ChannleStatusEnum } from "../../../utils/constants/enum";

const ChatActions: React.FC<{
	currentChannel: IChatChannel;
	username?: string;
}> = ({ currentChannel, username }) => {
	const { t } = useTranslation();

	return (
		<div className="flex justify-between">
			<div className="flex items-center gap-3 bg-dark-60 rounded-2xl py-2 px-6">
				<img
					className="rounded-full w-[38px] h-[38px]"
					src={currentChannel.imgUrl}
					alt={currentChannel.name}
				/>
				
				{currentChannel.status === ChannleStatusEnum.DM && (
					<span className="text-grey-2 font-bold">@{username ? username : currentChannel.name }</span>
				)}

				{currentChannel.status !== ChannleStatusEnum.DM && (
					<span className="text-grey-2 font-bold">
						@{currentChannel.name}
					</span>
				)}
			</div>
			<div className="flex gap-4">
				{currentChannel.status === ChannleStatusEnum.DM && (
					<>
						<ButtonWithIcon
							className="bg-yellow"
							icon={<ProfileIcon className=" stroke-dark-60" />}
							label={t("chatPage.seeProfile")}
						/>
						<ButtonWithIcon
							className="bg-red text-white"
							icon={<PlayIcon />}
							label={t("chatPage.inviteToPlay")}
						/>
					</>
				)}
				{currentChannel.status !== ChannleStatusEnum.BOT && currentChannel.status !== ChannleStatusEnum.DM && (
					<>
						<ButtonWithIcon
							className="bg-yellow"
							icon={<CogIcon className=" " />}
							label={t("chatPage.channelSettings")}
						/>
						<ButtonWithIcon
							className="bg-red text-white"
							icon={<AddIcon />}
							label={t("chatPage.createChannel")}
						/>
					</>
				)}
			</div>
		</div>
	);
};

export default ChatActions;
