import { useTranslation } from "react-i18next";
import useLocalStorage from "../../hooks/useLocalStorage";
import { LanguagesEnum } from "../../utils/constants/enum";
import { LNG } from "../../utils/constants/settings";

const Footer = () => {
	const { t, i18n } = useTranslation();

	const [lng, setLng] = useLocalStorage(LNG, LanguagesEnum.EN);

	const changeLanguageToEnglish = () => {
		i18n.changeLanguage(LanguagesEnum.EN);
		setLng(LanguagesEnum.EN);
	};

	const changeLanguageToArabic = () => {
		i18n.changeLanguage(LanguagesEnum.AR);
		setLng(LanguagesEnum.AR);
	};

	const changeLanguageToTifinagh = () => {
		i18n.changeLanguage(LanguagesEnum.TI);
		setLng(LanguagesEnum.TI);
	};

	return (
		<div className="bg-dark-60 mt-20 text-white">
			<div className="container flex justify-between">
				<p className=" px-6  text-sm font-medium p-4">
					{t("footer.textOne")}
				</p>
				<div className="flex items-center gap-4 text-sm text-white ">
					<span
						onClick={changeLanguageToEnglish}
						className="underline hover:text-yellow hover:no-underline cursor-pointer"
					>
						English
					</span>
					<span
						onClick={changeLanguageToArabic}
						className="underline hover:text-yellow hover:no-underline cursor-pointer"
					>
						عربية
					</span>
					<span
						onClick={changeLanguageToTifinagh}
						className="underline hover:text-yellow hover:no-underline cursor-pointer"
					>
						ⵜⵉⴼⵉⵏⴰⴳⵀ
					</span>
					<a
						href="https://img-19.commentcamarche.net/bmcs4IwLfVx0kXEeGPfVqI2ZOls=/1080x/smart/2928cf2db1414a1ab804f66de39dfa45/ccmcms-commentcamarche/30881565.png"
						className="underline hover:text-yellow hover:no-underline"
					>
						Français
					</a>
				</div>
				<p className=" px-6 text-sm font-medium p-4">
					{t("footer.textTwo")}
				</p>
			</div>
		</div>
	);
};

export default Footer;
