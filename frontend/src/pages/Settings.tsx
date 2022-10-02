import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Footer from "../components/Footer/Footer";
import NavBar from "../components/NavBar/NavBar";
import Hifd from "../components/pages/Settings/Hifd";
import How2FA from "../components/pages/Settings/How2FA";
import QRZone from "../components/pages/Settings/QRZone";
import UserSettingsCard from "../components/pages/Settings/UserSettingsCard";
import ErrorAlert, { ErrorAlertWithMessage } from "../components/UI/Error";
import SuccesAlert from "../components/UI/SuccesAlert";
import { setUserImg } from "../reducers/UserSlice";
import { disableTwoFactorAuth, enableTwoFactorAuth, getProfileSettings, updateProfileSettings, updateUsername } from "../services/profile/settings";
import { isResNotOk } from "../utils/helper/httpHelper";

const Settings = () => {

	const [isEnabled, setisEnabled] = useState(false);

	const [username, setusername] = useState("");

	const { t } = useTranslation();

	const [qrCodePath, setqrCodePath] = useState<string | null>(null);

	const [user, setUser] = useState<IUser | null>(null);

	useEffect(() => {
		getProfileSettings()
			.then((res) => {
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
					losses: userData.losses,
					twoFactorAuth: userData.twoFactorAuth,
				}));

				setisEnabled(userData.twoFactorAuth);

			})
			.catch((err) => {
				ErrorAlert(err);
			});
	}, []);

	const enabledhandler = () => {
		setisEnabled(prevEnabledStatus => !prevEnabledStatus);
		enableTwoFactorAuth()
			.then(res => {
				setqrCodePath(res.qrUrl);
				setisEnabled(true);
			})
			.catch(err => {
				console.error(err);
				ErrorAlert(err);
			})
	}

	const disable2FAhandler = () => {
		setisEnabled(prevEnabledStatus => false);
		disableTwoFactorAuth()
			.then(res => {
				SuccesAlert(res.message);
				setisEnabled(false);
			})
			.catch(err => {
				console.error(err);
				ErrorAlert(err);
			})
	}

	// handler for username html input event
	const usernameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		setusername(event.target.value);
	}

	const onHifdHandler = () => {
		// event.preventDefault();
		if (username === "" || username.trim().length < 3) {
			ErrorAlertWithMessage(t("settingsPage.usernameError"));
		}
		else {
			updateUsername(username)
			.then(res => {
				if (isResNotOk(res)) {
					ErrorAlert(res);
					return;
				}
				SuccesAlert(res.message);
			})
			.catch(err => {
				console.error(err);
				ErrorAlert(err);
			})
		}
	}

	const dispatch = useDispatch();

	const changeProfileImageHandler = (formData: any) => {

		updateProfileSettings(formData)
			.then((res) => {
				if (isResNotOk(res)) {
					ErrorAlert(res);
					return;
				}
				toast.success(res.message, {
					position: toast.POSITION.TOP_CENTER,
				});

				dispatch(setUserImg(res.imgUrl));

				setUser((prevState) => {
					if (prevState) {
						return {
							...prevState,
							imgUrl: res.imgUrl,
						};
					}
					return null;
				});
			})
			.catch((err) => {
				console.error(err);
				ErrorAlert(err);
			});
	};

	return (
		<div>
			<NavBar />
			<main className="container px-24 flex flex-col gap-10">
				<section className="container flex flex-wrap justify-around">
					<UserSettingsCard
						user={user}
						isEnabled={isEnabled}
						usernameHandler={usernameHandler}
						enabledhandler={enabledhandler}
						disable2FAhandler={disable2FAhandler}
						changeProfileImageHandler={changeProfileImageHandler}
						/>
					<QRZone isEnabled={isEnabled} qrCodePath={qrCodePath} />
				</section>
				<How2FA/>
				<Hifd onHifdHandler={onHifdHandler} />
			</main>
			<Footer />
		</div>
	);
};

export default Settings;
