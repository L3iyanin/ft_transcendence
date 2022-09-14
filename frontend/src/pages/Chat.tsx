import NavBar from "../components/NavBar/NavBar";
import InputWithIcon from "../components/UI/inputs/InputWithIcon";
import { ReactComponent as SearchIcon } from "../assets/icons/search.svg";
import { useTranslation } from "react-i18next";
import RoundedFilter from "../components/UI/RoundedFilter";

const Chat: React.FC = () => {

	const { t } = useTranslation();

	return (
		<div className="container">
			<NavBar />
			<div className="mt-14" />
			<div className="flex">
				<div>
					<InputWithIcon icon={<SearchIcon />} type="text" placeholder="Search" />
					<div className="bg-dark-60 mt-5 rounded-2xl p-5 text-white">
						<RoundedFilter firstLabel={t('chatPage.dms')} secondLabel={t('chatPage.channels')} whoIsActive={2} />
					</div>
				</div>
			</div>
		</div>
	);
}

export default Chat;