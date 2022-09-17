import { useEffect } from "react";
import { CookiesProvider, useCookies } from "react-cookie";
import { useTranslation } from "react-i18next";
import Router from "./routes/Router";
import { LNG } from "./utils/constants/settings";

const App: React.FC = () => {

	const [cookies, setCookie, removeCookie] = useCookies([LNG]);

	const { i18n } = useTranslation();

	useEffect(() => {
		if (cookies[LNG]) {
			i18n.changeLanguage(cookies[LNG]);
		}
	}, []);

	return (
		<CookiesProvider>
			<Router />
		</CookiesProvider>
	);
};

export default App;
