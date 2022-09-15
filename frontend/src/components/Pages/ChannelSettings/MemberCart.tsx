import { useTranslation } from "react-i18next";
import { channelMemberInterface } from "../../../utils/types/channelMember";
import ButtonWithIcon from "../../UI/button/buttonWithIcon";
import { ReactComponent as BanIcon } from "../../../assets/icons/ban.svg";
import { ReactComponent as MuteIcon } from "../../../assets/icons/mute.svg";
import { ReactComponent as KickOutIcon } from "../../../assets/icons/kickOut.svg";

const MemberCart: React.FC<{
	member: channelMemberInterface;
}> = (props) => {
	const { t } = useTranslation();

	return (
		<div className="container">
			<li className="flex flex-row p-3 pl-6 my-4 text-white rounded-lg bg-dark-60 justify-between">
				<div className="flex flex-row">
					<img
						src={props.member.imgUrl}
						className="w-12 h-12 rounded-full"
					/>
					<div className="flex flex-col ml-2">
						<p>{props.member.username}</p>
						<p>{props.member.fullName}</p>
					</div>
				</div>
				<div className="flex flex-row">
					<ButtonWithIcon
						icon={<BanIcon />}
						text={t("channelSettings.ban")}
						dropDown={true}
						options={[t("channelSettings.1Hour"), t("channelSettings.5Hours"), t("channelSettings.24Hours")]}
					/>
					<ButtonWithIcon
						icon={<MuteIcon />}
						text={t("channelSettings.mute")}
						dropDown={true}
						options={[t("channelSettings.1Hour"), t("channelSettings.5Hours"), t("channelSettings.24Hours")]}
					/>
					<ButtonWithIcon
						icon={<KickOutIcon />}
						text={t("channelSettings.kickOut")}
						dropDown={false}
					/>
					<ButtonWithIcon
						icon={<></>}
						text={t("roles.member")} 
						dropDown={true}
						options={["Test"]}
					/>
				</div>
			</li>
		</div>
	);
};

export default MemberCart;
