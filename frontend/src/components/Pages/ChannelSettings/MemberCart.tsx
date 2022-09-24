import { useTranslation } from "react-i18next";
import ButtonWithIcon from "../../UI/button/ButtonWithDropdown";
import { ReactComponent as BanIcon } from "../../../assets/icons/ban.svg";
import { ReactComponent as MuteIcon } from "../../../assets/icons/mute.svg";
import { ReactComponent as KickOutIcon } from "../../../assets/icons/kickOut.svg";

const MemberCart: React.FC<{
	member: IMember;
	makeAdminHandler: (userId: string) => void;
	makeMemberHandler: (userId: string) => void;
	kickOutHandler: (userId: string) => void;
}> = (props) => {
	const { t } = useTranslation();

	let actions = (
		<>
			<div className="flex flex-row">
				<ButtonWithIcon
					icon={<BanIcon />}
					text={t("channelSettings.ban")}
					dropDown={true}
					options={[
						t("channelSettings.2minutes"),
						t("channelSettings.1Hour"),
						t("channelSettings.5Hours"),
						t("channelSettings.24Hours"),
					]}
				/>
				<ButtonWithIcon
					icon={<MuteIcon />}
					text={t("channelSettings.mute")}
					dropDown={true}
					options={[
						t("channelSettings.2minutes"),
						t("channelSettings.1Hour"),
						t("channelSettings.5Hours"),
						t("channelSettings.24Hours"),
					]}
				/>
				<ButtonWithIcon
					icon={<KickOutIcon />}
					text={t("channelSettings.kickOut")}
					dropDown={false}
					onClickWithoutDropdown={props.kickOutHandler.bind(null, props.member.user.id.toString())}
				/>
				<ButtonWithIcon
					icon={<></>}
					text={t(`roles.${props.member.role.toLowerCase()}`)}
					dropDown={true}
					options={[
						`${
							props.member.role === "ADMIN" ||
							props.member.role === "OWNER"
								? "member"
								: "admin"
						}`,
					]}
					optionsOnClick={[
						props.member.role === "ADMIN" ||
						props.member.role === "OWNER"
							? props.makeMemberHandler.bind(null, props.member.user.id.toString())
							: props.makeAdminHandler.bind(null, props.member.user.id.toString()),
					]}
				/>
			</div>
		</>
	);

	if (props.member.role === "OWNER") {
		actions = (
			<>
				<ButtonWithIcon
					icon={<></>}
					text={t(`roles.${props.member.role.toLowerCase()}`)}
					dropDown={false}
				/>
			</>
		);
	} else if (props.member.status === "banned") {
		actions = (
			<>
				<div className="flex flex-row">
					<ButtonWithIcon
						icon={<BanIcon />}
						text={t("channelSettings.unban")}
						dropDown={false}
					/>
					<ButtonWithIcon
						icon={<KickOutIcon />}
						text={t("channelSettings.kickOut")}
						dropDown={false}
					/>
					<ButtonWithIcon
						icon={<></>}
						text={t(`roles.${props.member.role.toLowerCase()}`)}
						dropDown={true}
						options={[
							`${
								props.member.role === "ADMIN"
									? "member"
									: "admin"
							}`,
						]}
					/>
				</div>
			</>
		);
	} else if (props.member.status === "muted") {
		actions = (
			<>
				<div className="flex flex-row">
					<ButtonWithIcon
						icon={<BanIcon />}
						text={t("channelSettings.ban")}
						dropDown={true}
						options={[
							 t("channelSettings.2minutes"),
							t("channelSettings.1Hour"),
							t("channelSettings.5Hours"),
							t("channelSettings.24Hours"),
						]}
					/>
					<ButtonWithIcon
						icon={<MuteIcon />}
						text={t("channelSettings.unmute")}
						dropDown={false}
					/>
					<ButtonWithIcon
						icon={<KickOutIcon />}
						text={t("channelSettings.kickOut")}
						dropDown={false}
					/>
					<ButtonWithIcon
						icon={<></>}
						text={t(`roles.${props.member.role.toLowerCase()}`)}
						dropDown={true}
						options={[
							`${
								props.member.role === "ADMIN"
									? "member"
									: "admin"
							}`,
						]}
					/>
				</div>
			</>
		);
	}

	return (
		<div className="container">
			<li className="flex flex-row p-3 pl-6 my-4 text-white rounded-2xl bg-dark-60 justify-between">
				<div className="flex flex-row items-center">
					<img
						src={props.member.user.imgUrl}
						className="w-12 h-12 rounded-full"
					/>
					<div className="flex flex-col ml-2">
						<p className="font-bold">{props.member.user.username}</p>
						<p>{props.member.user.fullName}</p>
					</div>
				</div>
				{actions}
			</li>
		</div>
	);
};

export default MemberCart;
