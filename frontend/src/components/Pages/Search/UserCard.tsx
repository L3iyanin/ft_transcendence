import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ReactComponent as PlusSignIcon } from "../../../assets/icons/plusSign.svg";
import { addFriend } from "../../../services/profile/profile";
import ButtonWithDropdown from "../../UI/button/ButtonWithDropdown";
import { ErrorAlertWithMessage } from "../../UI/Error";
import SuccesAlert from "../../UI/SuccesAlert";

const UserCard: React.FC<{ user: IUser }> = ({ user }) => {
	const { id, fullName, username, imgUrl, isFriend } = user;
	const { t } = useTranslation();

	const [isFriendAdded, setIsFriendAdded] = useState(false);

	const addFriendHandler = () => {
		console.log("add friend");
		addFriend(id.toString()).then((res) => {
			SuccesAlert(`${t("friendAdded")}`);
			setIsFriendAdded(true);
		}).catch((err) => {
			ErrorAlertWithMessage(err.message.data.message);
		});
	};

	return (
		<li>
			<Link to={`/profile/${id}`}>
			<div className="flex flex-row justify-between p-3 pl-6 my-4 text-white rounded-2xl bg-dark-60">
				<div className="flex flex-row items-center">
					<img src={imgUrl} className="w-12 h-12 rounded-full" />
					<div className="flex flex-col ml-2">
						<p>{username}</p>
						<p>{fullName}</p>
					</div>
				</div>
				<div className="flex flex-row">
					{(isFriend || isFriendAdded) && <p className="px-8 my-auto">{t("alreadyFriends")}</p>}
					{(!isFriend && !isFriendAdded) && <ButtonWithDropdown
						icon={<PlusSignIcon />}
						text={t("addFriend")}
						dropDown={false}
						onClickWithoutDropdown={addFriendHandler}
					/>}
				</div>
			</div>
			</Link>
		</li>
	);
};

export default UserCard;
