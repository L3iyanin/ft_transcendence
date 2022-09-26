import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import EnglishLanguage from "./locales/en/translations.json";
import ArabicLanguage from "./locales/ar/translations.json";
import tifinaghLanguage from "./locales/ti/translations.json";

i18n.use(initReactI18next).init({
	fallbackLng: "en",
	lng: "en",
	resources: {
		en: {
			translations: EnglishLanguage,
		},
		ar: {
			translations: ArabicLanguage,
		},
		ti: {
			translations: tifinaghLanguage,
		}
	},
	ns: ["translations"],
	defaultNS: "translations",
});

i18n.languages = ["ar", "en", "ti"];

export default i18n;