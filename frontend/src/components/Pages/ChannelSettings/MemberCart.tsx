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
	banMemberHandler: (userId: string, duration: number) => void;
	unBanMemberHandler: (userId: string) => void;
	muteMemberHandler: (userId: string, duration: number) => void;
	unMuteMemberHandler: (userId: string) => void;
}> = (props) => {
	const { t } = useTranslation();

	const banOptions = [
		props.banMemberHandler.bind(
			null,
			props.member.user.id.toString(),
			2
		),
		props.banMemberHandler.bind(
			null,
			props.member.user.id.toString(),
			60
		),
		props.banMemberHandler.bind(
			null,
			props.member.user.id.toString(),
			300
		),
		props.banMemberHandler.bind(
			null,
			props.member.user.id.toString(),
			1440
		),
	]

	const mutedOptions = [
		props.muteMemberHandler.bind(
			null,
			props.member.user.id.toString(),
			2
		),
		props.muteMemberHandler.bind(
			null,
			props.member.user.id.toString(),
			60
		),
		props.muteMemberHandler.bind(
			null,
			props.member.user.id.toString(),
			300
		),
		props.muteMemberHandler.bind(
			null,
			props.member.user.id.toString(),
			1440
		),
	]

	const kickOutOption = props.kickOutHandler.bind(
		null,
		props.member.user.id.toString()
	)

	const makeAdminOrMemberOption = [
		props.member.role === "ADMIN" ||
		props.member.role === "OWNER"
			? props.makeMemberHandler.bind(
					null,
					props.member.user.id.toString()
			  )
			: props.makeAdminHandler.bind(
					null,
					props.member.user.id.toString()
			  ),
	]

	const adminOrMemberLabel = [
		`${
			props.member.role === "ADMIN" ||
			props.member.role === "OWNER"
				? t("roles.member")
				: t("roles.admin")
		}`,
	]

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
					optionsOnClick={banOptions}
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
					optionsOnClick={mutedOptions}
				/>
				<ButtonWithIcon
					icon={<KickOutIcon />}
					text={t("channelSettings.kickOut")}
					dropDown={false}
					onClickWithoutDropdown={kickOutOption}
				/>
				<ButtonWithIcon
					icon={<></>}
					text={t(`roles.${props.member.role.toLowerCase()}`)}
					dropDown={true}
					options={adminOrMemberLabel}
					optionsOnClick={makeAdminOrMemberOption}
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
	} else if (props.member.status === "BLOCKED") {
		actions = (
			<>
				<div className="flex flex-row">
					<ButtonWithIcon
						icon={<BanIcon />}
						text={t("channelSettings.unban")}
						dropDown={false}
						onClickWithoutDropdown={props.unBanMemberHandler.bind(
							null,
							props.member.user.id.toString()
						)}
					/>
					<ButtonWithIcon
						icon={<KickOutIcon />}
						text={t("channelSettings.kickOut")}
						dropDown={false}
						onClickWithoutDropdown={kickOutOption}
					/>
					<ButtonWithIcon
						icon={<></>}
						text={t(`roles.${props.member.role.toLowerCase()}`)}
						dropDown={true}
						options={adminOrMemberLabel}
						optionsOnClick={makeAdminOrMemberOption}
					/>
				</div>
			</>
		);
	} else if (props.member.status === "MUTED") {
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
						optionsOnClick={banOptions}
					/>
					<ButtonWithIcon
						icon={<MuteIcon />}
						text={t("channelSettings.unmute")}
						dropDown={false}
						onClickWithoutDropdown={props.unMuteMemberHandler.bind(
							null,
							props.member.user.id.toString()
						)}
					/>
					<ButtonWithIcon
						icon={<KickOutIcon />}
						text={t("channelSettings.kickOut")}
						dropDown={false}
						onClickWithoutDropdown={kickOutOption}
					/>
					<ButtonWithIcon
						icon={<></>}
						text={t(`roles.${props.member.role.toLowerCase()}`)}
						dropDown={true}
						options={adminOrMemberLabel}
						optionsOnClick={makeAdminOrMemberOption}
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
						<p className="font-bold">
							{props.member.user.username}
						</p>
						<p>{props.member.user.fullName}</p>
					</div>
				</div>
				{actions}
			</li>
		</div>
	);
};

export default MemberCart;
