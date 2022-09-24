import { useTranslation } from "react-i18next";
import { ReactComponent as UploadIcon } from "../../../assets/icons/UploadAvatar.svg";

const UserSettingsCard: React.FC<{ user: IUser, enabledhandler: () =>void }> = ({ user, enabledhandler }) => {
	const { t } = useTranslation();

	return (
		<section className="container min-w-[235px] rounded-lg w-72 p-10 flex flex-col gap-4 items-center bg-dark-60 bg-opacity-60 text-white ">
			<article className="relative">
				<img
					src={user.imgUrl}
					alt={user.username + ": avatar"}
					className="block rounded-full w-36"
				/>
				<div className="rounded-full absolute left-8/12 top-10/12 flex justify-center items-center bg-red w-6 h-6 ">
					<UploadIcon className="w-4"/>
				</div>
			</article>
			<section className="container flex flex-col items-center gap-3">
				<p className="text-base text-center font-bold">
					{user.fullName}
				</p>
				<form action="">
					<input
						type="text"
						name="username"
						placeholder={user.username}
						className="h-8 w-36 rounded-md text-xs px-2 bg-dark-60 border border-white"
					/>
				</form>
				<button onClick={enabledhandler} className="h-8 w-36 bg-red rounded-md px-2 py-1 text-xs">
					{t("settingsPage.Enable2FA")}
				</button>
			</section>
		</section>
	);
};

export default UserSettingsCard;
