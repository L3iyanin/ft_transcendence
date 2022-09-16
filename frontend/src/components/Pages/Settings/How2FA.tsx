import { useTranslation } from "react-i18next";
import { ReactComponent as QRIcon } from "../../../assets/icons/QR.svg";
import { ReactComponent as GoogleAuth } from "../../../assets/icons/GoogleAuth.svg";
import { ReactComponent as AppStoreLogo } from "../../../assets/icons/AppStore.svg";
import { ReactComponent as PlayStoreLogo } from "../../../assets/icons/PlayStore.svg";

const How2FA = () => {
	const { t } = useTranslation();

	return (
		<section className="container rounded-lg flex gap-4 items-center bg-dark-60 bg-opacity-60">
			<h2>How to Enable Two Factor Authentication:</h2>
			<div className="container flex justify-center items-center gap-4">
				<article className="container w-48 border rounded-lg">
					<h3>Install Google Auth</h3>
					<GoogleAuth />
					<AppStoreLogo />
					<PlayStoreLogo />
				</article>
				<article>
					<h3>Scan the QR</h3>
				</article>
				<article>
					<h3>Verify your device</h3>
				</article>
			</div>
		</section>
	);
};

export default How2FA;
