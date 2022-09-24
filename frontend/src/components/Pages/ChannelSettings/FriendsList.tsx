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
		refreshHandler: () => void,
		friends: IUser[] | null,
	}> = ({
	channelInfo,
	refreshHandler,
	friends
}) => {
	const { t } = useTranslation();

	if (!friends) {
		return <LoadingBar />;
	}

	const addFriendToChannelHandler = (friendId: string) => {
		addFriendToChannel(channelInfo.id.toString(), friendId)
			.then((res) => {
				console.log(res);
				SuccesAlert(res.message);
				refreshHandler();
				// setFriends((prevFriends) => {
				// 	if (prevFriends) {
				// 		return prevFriends.filter((friend) => friend.id !== +friendId);
				// 	}
				// 	return null;
				// });
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
