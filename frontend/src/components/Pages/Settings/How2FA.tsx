import { useTranslation } from "react-i18next";
import { ReactComponent as QRIcon } from "../../../assets/icons/QR.svg";
import { ReactComponent as GoogleAuth } from "../../../assets/icons/GoogleAuth.svg";
import { ReactComponent as AppStoreLogo } from "../../../assets/icons/AppStore.svg";
import { ReactComponent as PlayStoreLogo } from "../../../assets/icons/PlayStore.svg";

const How2FA = () => {
	const { t } = useTranslation();

	const style = "container m-2 w-72 h-72 px-5 py-3 border rounded-lg flex flex-col";
	return (
		<section className="container min-w-[350px] p-8 rounded-lg flex flex-col gap-10 bg-dark-60 bg-opacity-60 text-white text-base">
			<h2 className="text-xl font-bold">
				How to Enable Two Factor Authentication:
			</h2>
			<div className="container flex justify-center items-center gap-8">
				<article
					className={style + " justify-center items-center gap-9"}
				>
					<h3>Install Google Auth</h3>
					<GoogleAuth className="w-40 h-40" />
					<div className="container flex justify-between items-center gap-4">
						<AppStoreLogo />
						<PlayStoreLogo />
					</div>
				</article>

				<article
					className={style + " justify-center items-center gap-9"}
				>
					<h3>Scan the QR</h3>
					<div className="container flex flex-col items-center gap-2">
						<QRIcon className="w-48 h-48" />
						<p className="text-sm">nbkvcwthrwsvm2s4</p>
					</div>
				</article>

				<article
					className={style + " justify-center items-center gap-20"}
				>
					<h3>Verify your device</h3>
					<form
						action=""
						className="container flex flex-col justify-center items-center gap-14"
					>
						<div className="container flex flex-col justify-center items-center gap-3">
							<label htmlFor="AuthCodeInput">
								{t("Enter your code")}
							</label>
							<input
								type="number"
								id="AuthCodeInput"
								name="UserAuthCode"
								placeholder="689065"
								className="h-10 w-52 rounded-md text-center text-xs px-2 bg-inherit border border-white"
							/>
						</div>
						<button className="w-36 py-2 rounded-lg bg-light-gray text-black text-center">
							{t("verify")}
						</button>
					</form>
				</article>
			</div>
		</section>
	);
};

export default How2FA;
