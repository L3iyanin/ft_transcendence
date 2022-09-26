import NavBar from "../components/NavBar/NavBar";
import InputWithIcon from "../components/UI/inputs/InputWithIcon";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import MembersList from "../components/Pages/ChannelSettings/MembersList";
import { membersData, friendsListData } from "../utils/data/ChannelSettings";
import FriendsList from "../components/Pages/ChannelSettings/FriendsList";
import { useEffect, useState } from "react";
import { getChannelInfo, leaveChannel } from "../services/channel/settings";
import ErrorAlert from "../components/UI/Error";
import { isResNotOk } from "../utils/helper/httpHelper";
import { useSelector } from "react-redux";
import { getFriends } from "../services/profile/profile";
import ButtonWithIcon from "../components/UI/Buttons/ButtonWithIcon";
import { ReactComponent as LeaveIcon } from "../assets/icons/leave.svg";
import SuccesAlert from "../components/UI/SuccesAlert";
import { IamAdminOrOwner } from "../utils/helper/chat";

const ChannelSettings: React.FC = () => {

	const { channelId } = useParams();

	const { t } = useTranslation();

	const [channelInfo, setChannelInfo] = useState<IChatChannel| null>(null);

	const [friends, setFriends] = useState<IUser[] | null>(null);

	const [refresh, setRefresh] = useState<boolean>(false);
	
	const LocalUserData = useSelector((state: any) => state.user.user);

	const navigate = useNavigate();

	useEffect(() => {
		if (channelId) {
			getChannelInfo(channelId)
				.then(res => {
					// console.log(res)
					if (isResNotOk(res) === true) {
						ErrorAlert(res);
						return;
					}
					
					if (IamAdminOrOwner(res.channel.members, LocalUserData.id) === false) {
						navigate(`/chat`);
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

	const leaveChannelHandler = () => {
		if (channelId) {
			leaveChannel(channelId)
				.then((res) => {
					SuccesAlert(res.message);
					navigate("/chat");
				})
				.catch((err) => {
					console.log(err);
					ErrorAlert(err);
				});
		}
	}

	if (channelInfo === null) {
		return <div className="text-center text-white mt-5">Loading...</div>;
	}

	return (
		<div className="container">
			<NavBar />
			<div className="flex justify-between items-center">
				<h2 className="text-xl font-semibold text-white">
					{channelInfo && channelInfo.name} {t("channelSettings.channelSettings")}
				</h2>
				<ButtonWithIcon onClick={leaveChannelHandler} icon={<LeaveIcon className="w-5 h-5" />} label={t("channelSettings.leaveChannel")} className="bg-red text-white" iconOnRight />
			</div>
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