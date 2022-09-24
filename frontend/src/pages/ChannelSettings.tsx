import NavBar from "../components/NavBar/NavBar";
import InputWithIcon from "../components/UI/inputs/InputWithIcon";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import MembersList from "../components/Pages/ChannelSettings/MembersList";
import { membersData, friendsListData } from "../utils/data/ChannelSettings";
import FriendsList from "../components/Pages/ChannelSettings/FriendsList";
import { useEffect, useState } from "react";
import { getChannelInfo } from "../services/channel/settings";
import ErrorAlert from "../components/UI/Error";
import { isResNotOk } from "../utils/helper/httpHelper";
import { useSelector } from "react-redux";
import { getFriends } from "../services/profile/profile";

const ChannelSettings: React.FC = () => {

	const { channelId } = useParams();

	const { t } = useTranslation();

	const [channelInfo, setChannelInfo] = useState<IChatChannel| null>(null);

	const [friends, setFriends] = useState<IUser[] | null>(null);

	const [refresh, setRefresh] = useState<boolean>(false);
	
	const LocalUserData = useSelector((state: any) => state.user.user);

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
	}, [refresh]);



	useEffect(() => {
		if (channelInfo) {
			const userId = LocalUserData.id;
			getFriends(userId)
				.then((res) => {
	
					if (isResNotOk(res)) {
						ErrorAlert(res);
						return;
					}
	
					const friendsNotInChannel = returnNotMembersFriends(channelInfo, res);
					setFriends(friendsNotInChannel);
				})
				.catch((err) => {
					ErrorAlert(err);
				});
		}
	}, [channelInfo, refresh]);

	const refreshHandler = () => {
		setRefresh(!refresh);
	};

	return (
		<div className="container">
			<NavBar />
			<h2 className="text-xl font-semibold text-white">
				{channelInfo && channelInfo.name} {t("channelSettings.channelSettings")}
			</h2>
			<MembersList
				channelInfo={channelInfo}
				members={membersData}
				refreshHandler={refreshHandler}
				/>

			<div className="flex mt-11">
				<div>
					<h2 className="text-xl font-semibold text-white">
						{t("channelSettings.addFriendsToRoom")} {channelInfo && channelInfo.name}
					</h2>
					<div className="pt-4" />
				</div>
			</div>
			{channelInfo && <FriendsList friends={friends} refreshHandler={refreshHandler} channelInfo={channelInfo} /> }
		</div>
	);
};

export default ChannelSettings;


const returnNotMembersFriends = (channelInfo: IChatChannel, frineds: IUser[]) => {
	const friendsNotInChannel = [];

	for (let j = 0; j < frineds.length; j++) {
		let isFound = false;
		for (let i = 0; i < channelInfo.members.length; i++) {
			const member = channelInfo.members[i];
			if (member.user.id === frineds[j].id) {
				isFound = true;
				break;
			}
		}
		if (!isFound) {
			friendsNotInChannel.push(frineds[j]);
		}
	}

	return friendsNotInChannel;
}