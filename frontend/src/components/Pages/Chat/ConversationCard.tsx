import moment from "moment";
import { useTranslation } from "react-i18next";
import { ChannleStatusEnum } from "../../../utils/constants/enum";
import { getMessageWithLength } from "../../../utils/helper/messageHelper";

const ConversationCard:React.FC<{
	channel: IChatChannel;
	onClick: (channel: IChatChannel) => void;
}> = ({ channel, onClick }) => {
	return (
		<div className="flex gap-2 cursor-pointer" onClick={onClick.bind(null, channel)}>
			<div>
				<img src={channel.imgUrl} alt={channel.name} className="w-[50px] h-[50px] rounded-full" />
			</div>
			<div className="flex flex-col justify-between">
				<span className="font-bold">{channel.name}</span>
				<span className="text-xs text-grey-2">{getPublicLastMessageOrChannelType(channel)}</span>
			</div>
			<div className="flex flex-col justify-between ml-auto items-end">
				{channel.lastMessage && ( <span className="text-xs text-grey-2 font-bold">{moment(channel.lastMessage?.date).format('HH:mm')}</span>)}
				{!channel.lastMessage && ( <span className="text-xs text-grey-2 font-bold"></span>)}
				{channel.uneadMessages != 0 && channel.uneadMessages && <div className="text-xs text-grey flex justify-center items-center bg-yellow w-[18px] h-[18px] rounded-full">{channel.uneadMessages}</div>}
			</div>
		</div>
	);
};

export default ConversationCard;


export const getPublicLastMessageOrChannelType = (channel: IChatChannel) => {

	const { t } = useTranslation();

	if (channel.status === ChannleStatusEnum.DM) {
		return getMessageWithLength(channel.lastMessage?.content);
	}

	if (channel.status === ChannleStatusEnum.PROTECTED) {
		return t('chatPage.protectedChannel');
	}

	if (channel.status === ChannleStatusEnum.PRIVATE) {
		return t('chatPage.privateChannel');
	}

	return t('chatPage.publicChannel');

}