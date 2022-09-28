import { useState } from "react";
import { useTranslation } from "react-i18next";
import Footer from "../components/Footer/Footer";
import NavBar from "../components/NavBar/NavBar";
import Hifd from "../components/pages/Settings/Hifd";
import How2FA from "../components/pages/Settings/How2FA";
import QRZone from "../components/pages/Settings/QRZone";
import UserSettingsCard from "../components/pages/Settings/UserSettingsCard";
import ErrorAlert, { ErrorAlertWithMessage } from "../components/UI/Error";
import SuccesAlert from "../components/UI/SuccesAlert";
import { updateUsername } from "../services/profile/settings";

const Settings = () => {

	const [isEnabled, setisEnabled] = useState(false);

	const [username, setusername] = useState("");

	const { t } = useTranslation();

	const enabledhandler = () => {
		setisEnabled(prevEnabledStatus => !prevEnabledStatus);
	}

	// handler for username html input event
	const usernameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		// console.log(event.target.value);
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
				// console.log(res);
				SuccesAlert(res.message);
			})
			.catch(err => {
				console.error(err);
				ErrorAlert(err);
			})
		}
	}

	return (
		<div>
			<NavBar />
			<main className="container px-24 flex flex-col gap-10">
				<section className="container flex justify-between gap-10">
					<UserSettingsCard usernameHandler={usernameHandler} enabledhandler={enabledhandler} />
					<QRZone isEnabled={isEnabled} />
				</section>
				<How2FA/>
				<Hifd onHifdHandler={onHifdHandler} />
			</main>
			<Footer />
		</div>
	);
};

export default Settings;
