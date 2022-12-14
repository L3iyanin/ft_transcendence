import { useTranslation } from "react-i18next";
import { LanguagesEnum } from "../../utils/constants/enum";
import { useDispatch } from "react-redux";
import { changeLng } from "../../reducers/SettingsSlice";

const Footer = () => {
	const { t } = useTranslation();

	const dispatch = useDispatch();

	const changeLanguageToEnglish = () => {
		dispatch(changeLng(LanguagesEnum.EN));
	};

	const changeLanguageToArabic = () => {
		dispatch(changeLng(LanguagesEnum.AR));
	};

	const changeLanguageToTifinagh = () => {
		dispatch(changeLng(LanguagesEnum.TI));
	};

	return (
		<div className="bg-dark-60 mt-20 text-white">
			<div className="container flex justify-between flex-wrap">
				<p className=" px-6 text-sm font-medium p-4 w-full md:w-auto md:text-left text-center">
					{t("footer.textOne")}
				</p>
				<div className="flex items-center gap-4 text-sm text-white w-full md:w-auto justify-center">
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
				<p className=" px-6 text-sm font-medium p-4 w-full md:w-auto md:text-left text-center">
					{t("footer.textTwo")}
				</p>
			</div>
		</div>
	);
};

export default Footer;
