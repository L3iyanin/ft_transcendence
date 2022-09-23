import NavBar from "../components/NavBar/NavBar";
import InputWithIcon from "../components/UI/inputs/InputWithIcon";
import { ReactComponent as SearchIcon } from "../assets/icons/search.svg";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import MembersList from "../components/Pages/ChannelSettings/MembersList";
import { membersData, friendsListData } from "../utils/data/ChannelSettings";
import FriendsList from "../components/Pages/ChannelSettings/FriendsList";
import { useEffect, useState } from "react";
import { getChannelInfo } from "../services/channel/settings";
import ErrorAlert from "../components/UI/Error";
import { isResNotOk } from "../utils/helper/httpHelper";

const ChannelSettings: React.FC = () => {

	const { channelId } = useParams();

	const { t } = useTranslation();

	const [channelInfo, setChannelInfo] = useState<IChatChannel| null>(null);

	useEffect(() => {
		if (channelId) {
			getChannelInfo(channelId)
				.then(res => {
					// console.log(res)
					if (isResNotOk(res) === true) {
						ErrorAlert(res);
						return;
					}
					setChannelInfo(res.channel);
				})
				.catch(err => {
					ErrorAlert(err);
				});
		}
	}, []);

	return (
		<div className="container">
			<NavBar />
			<h2 className="text-xl font-semibold text-white">
				{channelInfo && channelInfo.name} {t("channelSettings.channelSettings")}
			</h2>
			<MembersList channelInfo={channelInfo} members={membersData} />

			<div className="flex mt-11">
				<div>
					<h2 className="text-xl font-semibold text-white">
						{t("channelSettings.addFriendsToRoom")} {channelInfo && channelInfo.name}
					</h2>
					<div className="pt-4" />
					<InputWithIcon
						icon={<SearchIcon />}
						type="text"
						placeholder="Search"
					/>
				</div>
			</div>
			<FriendsList channelId={channelId!} />
		</div>
	);
};

export default ChannelSettings;
