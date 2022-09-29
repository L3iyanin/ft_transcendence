import { ReactComponent as Arcade } from "../../../assets/icons/Arcade.svg";
import { ReactComponent as Logo } from "../../../assets/icons/pong-3yan.svg";
import { useTranslation } from "react-i18next";

const TopSection = () => {
	const { t } = useTranslation();
	return (
		<div className="flex justify-center gap-36 pb-14 mt-28">
			<div className="h-96 flex flex-col">
				<Logo className="max-h-full" />
				<a href={import.meta.env.VITE_APP_42_AUTH_LINK} className="text-center text-white p-4 m-4 bg-red rounded-xl">
					{t("signinWith42")}
				</a>
			</div>
			<div className="h-96 hidden md:block">
				<Arcade className="max-h-full" />
			</div>
		</div>
	);
};

export default TopSection;
