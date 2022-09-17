import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import useLocalStorage from "./hooks/useLocalStorage";
import Router from "./routes/Router";
import { LanguagesEnum } from "./utils/constants/enum";
import { LNG } from "./utils/constants/settings";

const App: React.FC = () => {

	const [lng, setLng] = useLocalStorage(LNG, LanguagesEnum.EN);

	const { i18n } = useTranslation();

	useEffect(() => {
		if (lng) {
			i18n.changeLanguage(lng);
		}
	}, [lng]);

	return (
		<Router />
	);
};

export default App;
