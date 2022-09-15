import { useTranslation } from "react-i18next";
import RoundedHr from "../../UI/Hr/RoundedHr";
import RoundedFilter from "../../UI/RoundedFilter";
import ConversationCard from "./ConversationCard";


const ConversationsList: React.FC<{
	channels: IChatChannel[];
}> = ({ channels }) => {

	const { t } = useTranslation();

	return (
			<div className="bg-dark-60 mt-5 rounded-2xl p-5 text-white max-h-[70vh] overflow-y-auto">
				<RoundedFilter firstLabel={t('chatPage.dms')} secondLabel={t('chatPage.channels')} whoIsActive={1} />
				<div className="w-full mt-5">
					{
						channels.map((channel, index) => {
							if (index === channels.length - 1) {
								return <ConversationCard channel={channel} key={channel.id} />
							}
							else {
								return (
									<>
										<ConversationCard channel={channel} key={channel.id} />
										<RoundedHr />
									</>
								)
							}
						}
						)
					}
				</div>
			</div>
	);
};

export default ConversationsList;