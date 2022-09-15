import ButtonWithIcon from "../../UI/Buttons/ButtonWithIcon";
import { ReactComponent as ProfileIcon } from "../../../assets/icons/profile.svg";
import { ReactComponent as PlayIcon } from "../../../assets/icons/play.svg";

const ChatActions: React.FC<{
	currentChannel: IChatChannel,
	username?: string
}> = ({ currentChannel, username }) => {
	return (
		<div className="flex justify-between">
			<div className="flex items-center gap-3 bg-dark-60 rounded-2xl py-2 px-6">
				<img className="rounded-full w-[38px] h-[38px]" src={currentChannel.imgUrl} alt={currentChannel.name} />
				{ username && <span className="text-grey-2 font-bold">@{username}</span>}
				{ !username && <span className="text-grey-2 font-bold">@{currentChannel.name}</span>}
			</div>
			<div className="flex gap-4">
				<ButtonWithIcon className="bg-yellow" icon={<ProfileIcon className=" stroke-dark-60" />} label="See Profile" />
				<ButtonWithIcon className="bg-red text-white" icon={<PlayIcon />} label="Invite to play" />
			</div>
		</div>
	);
}

export default ChatActions;