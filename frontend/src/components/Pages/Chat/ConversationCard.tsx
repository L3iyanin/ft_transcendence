import moment from "moment";
import { getMessageWithLength } from "../../../utils/helper/messageHelper";

const ConversationCard:React.FC<{
	channel: IChatChannel;
}> = ({ channel }) => {
	return (
		<div className="flex gap-2 cursor-pointer">
			<div>
				<img src={channel.imgUrl} alt={channel.name} className="w-[50px] h-[50px] rounded-full" />
			</div>
			<div className="flex flex-col justify-between">
				<span className="font-bold">{channel.name}</span>
				<span className="text-xs text-grey-2">
					{getMessageWithLength(channel.lastMessage?.content)}
				</span>
			</div>
			<div className="flex flex-col justify-between ml-auto items-end">
				{channel.lastMessage && ( <span className="text-xs text-grey-2 font-bold">{moment(channel.lastMessage?.date).format('HH:mm')}</span>)}
				{!channel.lastMessage && ( <span className="text-xs text-grey-2 font-bold"></span>)}
				{channel.notReadMessages != 0 && channel.notReadMessages && <div className="text-xs text-grey flex justify-center items-center bg-yellow w-[18px] h-[18px] rounded-full">{channel.notReadMessages}</div>}
			</div>
		</div>
	);
};

export default ConversationCard;
