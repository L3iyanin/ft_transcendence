import { useTranslation } from "react-i18next";
import RoundedHr from "../../UI/Hr/RoundedHr";
import RoundedFilter from "../../UI/RoundedFilter";


const ConversationsList: React.FC = () => {

	const { t } = useTranslation();

	return (
			<div className="bg-dark-60 mt-5 rounded-2xl p-5 text-white">
				<RoundedFilter firstLabel={t('chatPage.dms')} secondLabel={t('chatPage.channels')} whoIsActive={2} />
				<div className="w-full mt-5">
					<div className="flex gap-2">
						<div>
							<img src="https://myanimelist.tech/api/avatar?name=seven" alt="" className="w-[50px] h-[50px] rounded-full" />
						</div>
						<div className="flex flex-col justify-between">
							<span className="font-bold">Khalid benlyazid</span>
							<span className="text-xs text-grey-2">fik may organizer wahed gfhjgfd...</span>
						</div>
						<div className="flex flex-col justify-between ml-auto items-end">
							<span className="text-xs text-grey-2 font-bold">09:34</span>
							<div className="text-xs text-grey flex justify-center items-center bg-yellow w-[18px] h-[18px] rounded-full">1</div>
						</div>
					</div>
					<RoundedHr />
				</div>
			</div>
	);
};

export default ConversationsList;