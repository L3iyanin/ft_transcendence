import { useTranslation } from "react-i18next";
import { friendInterface } from "../../../utils/types/channelSettings";
import FriendCart from "./FriendCart";

const FriendsList: React.FC<{ friends: friendInterface[] }> = (
	props
) => {
	const { t } = useTranslation();

	return (
		<div className="container">
			<ul>
				{props.friends.map((friend, index) => {
					return <FriendCart friend={friend} key={index} />;
				})}
			</ul>
		</div>
	);
};

export default FriendsList;
