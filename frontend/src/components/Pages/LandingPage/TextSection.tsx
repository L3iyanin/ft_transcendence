import { ReactComponent as Css3Logo } from "../../../assets/icons/Css3Logo.svg";
import { ReactComponent as FigmaLogo } from "../../../assets/icons/FigmaLogo.svg";
import { ReactComponent as Html5Logo } from "../../../assets/icons/Html5Logo.svg";
import { ReactComponent as NestjsLogo } from "../../../assets/icons/NestjsLogo.svg";
import { ReactComponent as PostgresqlLogo } from "../../../assets/icons/PostgresqlLogo.svg";
import { ReactComponent as ReactLogo } from "../../../assets/icons/ReactLogo.svg";
import { ReactComponent as SocketioLogo } from "../../../assets/icons/SocketioLogo.svg";
import { ReactComponent as TypescriptLogo } from "../../../assets/icons/TypescriptLogo.svg";
import { ReactComponent as PongBallIcon } from "../../../assets/icons/pongBall.svg";
import { useTranslation } from "react-i18next";


const TextSection = () => {

	const { t } = useTranslation();

	return (
		<div className="max-w-3xl m-auto relative">
			<div className="hidden md:block absolute w-9 h-52 rounded-md bg-white -right-16 top-8" />
			<div className="hidden md:block absolute w-9 h-52 rounded-md bg-white -left-16 bottom-8" />
			<PongBallIcon className="hidden md:block absolute right-16 top-36" />
			<hr className="bg-white mt-8 py-[1px]" />
			<h2 className="text-white font-bold text-2xl text-center pt-8 pb-5">{t("about")}</h2>
			<p className="text-white text-center md:text-left">
				{t("landingPage.aboutParagrapOne")} <br />
				{t("landingPage.aboutParagrapTwo")}
			</p>
			<h2 className="text-white font-bold text-2xl text-center pb-5 pt-8">{t("mainFeatures")}</h2>
			<p className="text-white mx-4 md:mx-0">{t("landingPage.mainFeaturesHeader")}</p>
			<ul className="list-disc text-white pl-8 mx-4 md:mx-0 ">
				<li>{t("landingPage.mainFeaturesListOne")}</li>
				<li>{t("landingPage.mainFeaturesListTwo")}</li>
				<li>{t("landingPage.mainFeaturesListThree")}</li>
			</ul>
			<h2 className="text-white font-bold text-2xl text-center pb-5 pt-8">{t("technologiesUsed")}</h2>
			<div className="flex gap-4 pb-4">
				<SocketioLogo />
				<FigmaLogo />
				<ReactLogo />
				<Css3Logo />
				<Html5Logo />
				<NestjsLogo />
				<TypescriptLogo />
				<PostgresqlLogo />
			</div>
			<hr className="bg-white mt-8 py-[1px]" />
		</div>
	);
};

export default TextSection;
