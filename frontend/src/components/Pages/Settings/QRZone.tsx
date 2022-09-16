import { useTranslation } from "react-i18next";
import { ReactComponent as QRIcon } from "../../../assets/icons/QR.svg";


const QRZone = () => {
	const { t } = useTranslation();

	return (
		<section className="container min-w-[300px] rounded-lg flex flex-col justify-center items-center gap-6 text-white  bg-dark-60 bg-opacity-60">
			<h2 className="text-2xl">Enable 2FA:</h2>
			<div className="relative bg-dark-60">
				<QRIcon className="opacity-10"/>
				<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
					<p className="text-xs w-44">{t("Click to generate your 2FA QR code")}</p>
					<p className="text-8xl font-bold">?</p>
				</div>
			</div>
		</section>
	);
}

export default QRZone;