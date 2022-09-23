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

	const setAdminInChannelState = (userId: string) => {
		if (channelInfo) {
			setChannelInfo((prevChannelInfo) => {
				if (prevChannelInfo) {
					const newChannelInfo = {...prevChannelInfo};
					for (let i = 0; i < prevChannelInfo.members.length; i++) {
						if (prevChannelInfo.members[i].user.id === +userId) {
							prevChannelInfo.members[i].role = "ADMIN";
						}
					}
					return newChannelInfo;
				}
				else {
					return null;
				}
			})
		}
	};

	const setMemberInChannelState = (userId: string) => {
		if (channelInfo) {
			setChannelInfo((prevChannelInfo) => {
				if (prevChannelInfo) {
					const newChannelInfo = {...prevChannelInfo};
					for (let i = 0; i < prevChannelInfo.members.length; i++) {
						if (prevChannelInfo.members[i].user.id === +userId) {
							prevChannelInfo.members[i].role = "MEMBER";
						}
					}
					return newChannelInfo;
				}
				else {
					return null;
				}
			})
		}
	};

	const addMemberInChannelState = (user: IUser) => {
		if (channelInfo) {
			setChannelInfo((prevChannelInfo) => {
				if (prevChannelInfo) {
					const newChannelInfo = {...prevChannelInfo};
					newChannelInfo.members.push({
						id: newChannelInfo.members.length + 1,
						role: "MEMBER",
						user: user
					});
					return newChannelInfo;
				}
				else {
					return null;
				}
			})
		}
	}

	return (
		<div className="container">
			<NavBar />
			<h2 className="text-xl font-semibold text-white">
				{channelInfo && channelInfo.name} {t("channelSettings.channelSettings")}
			</h2>
			<MembersList
				channelInfo={channelInfo}
				members={membersData}
				setAdminInChannelState={setAdminInChannelState}
				setMemberInChannelState={setMemberInChannelState}
				/>

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
			{channelInfo && <FriendsList addMemberInChannelState={addMemberInChannelState} channelInfo={channelInfo} /> }
		</div>
	);
};

export default ChannelSettings;
