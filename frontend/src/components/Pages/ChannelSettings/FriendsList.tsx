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

const FriendsList: React.FC<{ channelId: string }> = ({ channelId }) => {
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
				setFriends(res);
			})
			.catch((err) => {
				ErrorAlert(err);
			});
	}, []);

	const addFriendToChannelHandler = (friendId: string) => {
		addFriendToChannel(channelId, friendId)
			.then((res) => {
				console.log(res);
				SuccesAlert(res.message);
			})
			.catch((err) => {
				console.log(err);
				ErrorAlert(err);
			});
	}

	if (!friends) {
		return (
			<div className="relative h-24 bg-dark-60 my-4 rounded-2xl">
				<LoadingSpinner />
			</div>
		);
	}

	return (
		<div className="container">
			<ul>
				{friends.map((friend, index) => {
					return <FriendCart addFriendToChannelHandler={addFriendToChannelHandler} friend={friend} key={index} />;
				})}
			</ul>
		</div>
	);
};

export default FriendsList;
