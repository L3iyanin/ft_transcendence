import { useTranslation } from "react-i18next";
import { friendInterface } from "../../../utils/types/channelSettings";
import ButtonWithIcon from "../../UI/button/ButtonWithDropdown";
import { ReactComponent as PlusSignIcon } from "../../../assets/icons/plusSign.svg";

const FriendCart: React.FC<{ friend: friendInterface }> = (props) => {
	const { t } = useTranslation();

	return (
		<div className="container">
			<li>
				<div className="container">
					<li className="flex flex-row justify-between p-3 pl-6 my-4 text-white rounded-lg bg-dark-60">
						<div className="flex flex-row">
							<img
								src={props.friend.imgUrl}
								className="w-12 h-12 rounded-full"
							/>
							<div className="flex flex-col ml-2">
								<p>{props.friend.username}</p>
								<p>{props.friend.fullName}</p>
							</div>
						</div>
						<div className="flex flex-row">
							<ButtonWithIcon
								icon={<PlusSignIcon />}
								text={t("channelSettings.addMember")}
								dropDown={false}
							/>
						</div>
					</li>
				</div>
			</li>
		</div>
	);
};

export default FriendCart;
