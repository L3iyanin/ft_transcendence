import NavBar from "../components/NavBar/NavBar";
import InputWithIcon from "../components/UI/inputs/InputWithIcon";
import { ReactComponent as SearchIcon } from "../assets/icons/search.svg";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import MembersList from "../components/Pages/ChannelSettings/MembersList";
import { membersData } from "../utils/data/ChannelSettings";

const ChannelSettings: React.FC = () => {
	const { channelId } = useParams();
	const { t } = useTranslation();

	// ! get channel info using channelId

	return (
		<div className="container">
			<NavBar />
			<h2 className="text-xl font-semibold text-white">
				{channelId} {t("channelSettings.channelSettings")}
			</h2>
			<MembersList members={membersData} />

			<div className="flex">
				<div>
					<h2 className="text-xl font-semibold text-white">
						Add friends to room {channelId}
					</h2>
					<div className="pt-4"/>
					<InputWithIcon
						icon={<SearchIcon />}
						type="text"
						placeholder="Search"
					/>
				</div>
			</div>
		</div>
	);
};

export default ChannelSettings;
