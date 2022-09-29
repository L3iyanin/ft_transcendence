import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { addFriendToChannel } from "../../../services/channel/settings";
import { getFriends } from "../../../services/profile/profile";
import { isResNotOk } from "../../../utils/helper/httpHelper";
import { friendInterface } from "../../../utils/types/channelSettings";
import ErrorAlert from "../../UI/Error";
import InputWithIcon from "../../UI/inputs/InputWithIcon";
import LoadingSpinner from "../../UI/Loading/LoadingSpinner";
import SuccesAlert from "../../UI/SuccesAlert";
import FriendCart from "./FriendCart";
import { ReactComponent as SearchIcon } from "../../../assets/icons/search.svg";

const FriendsList: React.FC<{
	channelInfo: IChatChannel;
	refreshHandler: () => void;
	friends: IUser[] | null;
}> = ({ channelInfo, refreshHandler, friends }) => {
	const { t } = useTranslation();
	const [usersList, setUsersList] = useState(friends);

	useEffect(() => {
		setUsersList(friends);
	}, [friends]);

	if (!friends) {
		return <LoadingBar />;
	}

	const addFriendToChannelHandler = (friendId: string) => {
		addFriendToChannel(channelInfo.id.toString(), friendId)
			.then((res) => {
				// console.log(res);
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
				console.error(err);
				ErrorAlert(err);
			});
	};

	const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		const searchValue = e.target.value;
		const filteredUsersList = friends.filter((user) =>
			user.username.toLowerCase().includes(searchValue.toLowerCase())
		);
		setUsersList(filteredUsersList);
	};

	return (
		<div className="container">
			<div className="flex flex-row justify-start">
				<InputWithIcon
					icon={<SearchIcon />}
					type="text"
					placeholder={t("search")}
					onChange={searchHandler}
				/>
			</div>
			<ul>
				{usersList && usersList.map((friend, index) => {
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
				{usersList && usersList.length === 0 && (
					<div className="flex items-center justify-center h-24 bg-dark-60 my-4 rounded-2xl">
						<p className="text-white text-lg">
							{t("channelSettings.youHaveNoFriendToadd")}
						</p>
					</div>
				)}
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
