import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { ReactComponent as UploadIcon } from "../../../assets/icons/UploadAvatar.svg";
import { getProfileSettings, updateProfileSettings } from "../../../services/profile/settings";
import { isResNotOk } from "../../../utils/helper/httpHelper";
import ErrorAlert from "../../UI/Error";
import Input from "../../UI/inputs/Input";
import LoadingSpinner from "../../UI/Loading/LoadingSpinner";

const UserSettingsCard: React.FC<{
	user: IUser;
	enabledhandler: () => void;
}> = ({ enabledhandler }) => {
	const { t } = useTranslation();

	const [user, setUser] = useState<IUser | null>(null);

	const hiddenFileInput = useRef<HTMLInputElement>(null);

	const handleClick = () => {
		if (hiddenFileInput.current) {
			hiddenFileInput.current.click();
		}
	};
	const handleChangeProfileImage = (event: any) => {
		const fileUploaded = event.target.files[0];
		// console.log(fileUploaded);
		const formData = new FormData();
		formData.append(
			"file",
			fileUploaded,
			fileUploaded.name
		);

		updateProfileSettings(formData)
		.then(res => {
			// console.log(res)
			if (isResNotOk(res)) {
				ErrorAlert(res);
				return ;
			}
			toast.success(res.message, {
				position: toast.POSITION.TOP_CENTER,
			});
			setUser((prevState) => {
				if (prevState) {
					return {
						...prevState,
						imgUrl: res.imgUrl,
					};
				}
				return null;
			})
		})
		.catch(err => {
			console.error(err);
			ErrorAlert(err);
		})
	};

	useEffect(() => {
		getProfileSettings()
			.then((res) => {
				// console.log(res);
				if (isResNotOk(res)) {
					ErrorAlert(res);
					return;
				}

				const userData = res;
				setUser((_) => ({
					id: userData.id,
					username: userData.username,
					fullName: userData.fullName,
					imgUrl: userData.imgUrl,
					numberOfAchievements: userData.numberOfAchievements,
					numberOfFriends: userData.numberOfFriends,
					wins: userData.wins,
					loses: userData.loses,
				}));
			})
			.catch((err) => {
				ErrorAlert(err);
			});
	}, []);

	if (!user) {
		return (
			<section className="relative w-[395px] h-[404px] rounded-2xl p-10 flex flex-col gap-7 items-center bg-dark-60 bg-opacity-60 text-white ">
				<LoadingSpinner />
			</section>
		);
	}

	return (
		<section className=" w-[395px] h-[404px] rounded-2xl p-10 flex flex-col gap-7 items-center bg-dark-60 bg-opacity-60 text-white ">
			<article className="relative">
				<img
					src={user.imgUrl}
					alt={user.username + ": avatar"}
					className="block rounded-full w-36 h-36"
				/>
				<div className="cursor-pointer rounded-full absolute left-8/12 top-10/12 flex justify-center items-center bg-red w-10 h-10 ">
					<UploadIcon onClick={handleClick} />
				</div>
				<input type="file" className="hidden" ref={hiddenFileInput} onChange={handleChangeProfileImage} />
			</article>

			<section className="container flex flex-col items-center gap-3">
				<p className="text-2xl text-center font-bold">
					{user.fullName}
				</p>
				<Input
					type="text"
					placeholder={user.username}
					className="w-full !py-3"
				/>
				<button
					onClick={enabledhandler}
					className="w-full py-3 bg-red rounded-md px-2"
				>
					{t("settingsPage.Enable2FA")}
				</button>
			</section>
		</section>
	);
};

export default UserSettingsCard;
