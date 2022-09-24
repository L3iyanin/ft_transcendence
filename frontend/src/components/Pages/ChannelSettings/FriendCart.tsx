import { useTranslation } from "react-i18next";
import ButtonWithIcon from "../../UI/button/ButtonWithDropdown";
import { ReactComponent as PlusSignIcon } from "../../../assets/icons/plusSign.svg";
import { Link } from "react-router-dom";

const FriendCart: React.FC<{
	addFriendToChannelHandler: (friendId: string) => void;
	friend: IUser;
}> = ({ friend, addFriendToChannelHandler }) => {
	const { t } = useTranslation();

	return (
		<li className="container">
			<Link to={`/profile/${friend.id}`}>
				<div className="container">
					<div className="flex flex-row justify-between p-3 pl-6 my-4 text-white rounded-2xl bg-dark-60">
						<div className="flex flex-row items-center">
							<img
								src={friend.imgUrl}
								className="w-12 h-12 rounded-full"
							/>
							<div className="flex flex-col ml-2">
								<p>{friend.username}</p>
								<p>{friend.fullName}</p>
							</div>
						</div>
						<div className="flex flex-row">
							<ButtonWithIcon
								icon={<PlusSignIcon />}
								text={t("channelSettings.addMember")}
								dropDown={false}
								onClickWithoutDropdown={addFriendToChannelHandler.bind(
									null,
									friend.id.toString()
								)}
							/>
						</div>
					</div>
				</div>
			</Link>
		</li>
	);
};

export default FriendCart;
