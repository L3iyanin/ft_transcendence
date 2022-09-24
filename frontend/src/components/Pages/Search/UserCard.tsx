import { useTranslation } from "react-i18next";
import { ReactComponent as PlusSignIcon } from "../../../assets/icons/plusSign.svg";
import ButtonWithDropdown from "../../UI/button/ButtonWithDropdown";

const UserCard: React.FC<{ user: IUser }> = ({ user }) => {
	const { id, fullName, username, imgUrl } = user;
	const { t } = useTranslation();

	return (
		<li>
			<div className="flex flex-row justify-between p-3 pl-6 my-4 text-white rounded-2xl bg-dark-60">
				<div className="flex flex-row items-center">
					<img src={imgUrl} className="w-12 h-12 rounded-full" />
					<div className="flex flex-col ml-2">
						<p>{username}</p>
						<p>{fullName}</p>
					</div>
				</div>
				<div className="flex flex-row">
					<ButtonWithDropdown
						icon={<PlusSignIcon />}
						text={t("addFriend")}
						dropDown={false}
					/>
				</div>
			</div>
		</li>
	);
};

export default UserCard;
