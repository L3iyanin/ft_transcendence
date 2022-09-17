import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import useLocalStorage from "./hooks/useLocalStorage";
import Router from "./routes/Router";
import { LanguagesEnum } from "./utils/constants/enum";
import { LNG } from "./utils/constants/settings";
import axios from "axios";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

axios.defaults.baseURL = `${import.meta.env.VITE_APP_API_BASE_URL}`;

const App: React.FC = () => {

	const [lng, setLng] = useLocalStorage(LNG, LanguagesEnum.EN);

	const { i18n } = useTranslation();


	useEffect(() => {
		if (lng) {
			i18n.changeLanguage(lng);
		}
	}, [lng]);

	return (
		<>
			<Router />
			<ToastContainer autoClose={2000} theme="colored" />
		</>
	);
};

export default App;
