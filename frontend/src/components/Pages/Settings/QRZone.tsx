import { useTranslation } from "react-i18next";
import { ReactComponent as QRIcon } from "../../../assets/icons/QR.svg";

const QRZone: React.FC<{
	isEnabled: boolean;
	qrCodePath: string | null;
}> = ({ isEnabled, qrCodePath }) => {
	
	const { t } = useTranslation();

	return (
		<section className="container min-w-[300px] rounded-lg flex flex-col justify-center items-center gap-6 text-white  bg-dark-60 bg-opacity-60">
			{!isEnabled && (
				<h2 className="text-2xl">{t("settingsPage.EnableTwoFA")}</h2>
			)}
			{isEnabled && (
				<h2 className="text-2xl">{t("settingsPage.TwoFaEnabled")}</h2>
			)}
			{isEnabled && qrCodePath && (
				<div className="relative bg-white p-2">
					<img src={qrCodePath} alt="qr code" className="w-48 h-48" loading="lazy" />
				</div>
			)}
			{!isEnabled && (
				<div className="relative bg-dark-60 p-2">
					<QRIcon />

					<div className="absolute top-0 left-0 h-full w-full bg-dark-60 bg-opacity-80 flex items-center justify-center flex-col text-center">
						<p className="text-xs w-44">
							{t("settingsPage.GenerateQR")}
						</p>
						<p className="text-8xl font-bold">?</p>
					</div>
				</div>
			)}
		</section>
	);
};

export default QRZone;
