import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { addFriendToChannel } from "../../../services/channel/settings";
import { getFriends } from "../../../services/profile/profile";
import { isResNotOk } from "../../../utils/helper/httpHelper";
import { friendInterface } from "../../../utils/types/channelSettings";
import ErrorAlert from "../../UI/Error";
import LoadingSpinner from "../../UI/Loading/LoadingSpinner";
import SuccesAlert from "../../UI/SuccesAlert";
import FriendCart from "./FriendCart";

const FriendsList: React.FC<{
		channelInfo: IChatChannel,
		addMemberInChannelState: (user: IUser) => void,
	}> = ({
	channelInfo,
	addMemberInChannelState,
}) => {
	const { t } = useTranslation();

	const [friends, setFriends] = useState<IUser[] | null>(null);

	const LocalUserData = useSelector((state: any) => state.user.user);

	useEffect(() => {
		const userId = LocalUserData.id;
		getFriends(userId)
			.then((res) => {
				// console.log(res);
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
	}, []);

	if (!friends) {
		return <LoadingBar />;
	}

	const addFriendToChannelHandler = (friendId: string) => {
		addFriendToChannel(channelInfo.id.toString(), friendId)
			.then((res) => {
				console.log(res);
				SuccesAlert(res.message);
				setFriends((prevFriends) => {
					if (prevFriends) {
						addMemberInChannelState(prevFriends.find((friend) => friend.id === +friendId)!);
						return prevFriends.filter((friend) => friend.id !== +friendId);
					}
					return null;
				});
			})
			.catch((err) => {
				console.log(err);
				ErrorAlert(err);
			});
	};

	return (
		<div className="container">
			<ul>
				{friends.map((friend, index) => {
					return (
						<FriendCart
							addFriendToChannelHandler={
								addFriendToChannelHandler
							}
							friend={friend}
							key={index}
						/>
					);
				})}
				{
					friends.length === 0 && (
						<div className="flex items-center justify-center h-24 bg-dark-60 my-4 rounded-2xl">
							<p className="text-white text-lg">{t("channelSettings.youHaveNoFriendToadd")}</p>
						</div>
					)
				}
			</ul>
		</div>
	);
};

export default FriendsList;

const LoadingBar = () => {
	return (
		<div className="relative h-24 bg-dark-60 my-4 rounded-2xl">
			<LoadingSpinner />
		</div>
	);
};

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