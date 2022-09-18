import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Router from "./routes/Router";
import axios from "axios";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from "react-redux";
import { getLng } from "./reducers/SettingsSlice";
import { getUser } from "./reducers/UserSlice";
import { LNG_KEY } from "./utils/constants/settings";

axios.defaults.baseURL = `${import.meta.env.VITE_APP_API_BASE_URL}`;

axios.interceptors.request.use(
	(config: any) => {
		const lng = localStorage.getItem(LNG_KEY);

		if (lng) {
			config.headers["Accept-Language"] = JSON.parse(lng);
		}

		return config;
	},
	(error: any) => Promise.reject(error)
);

const App: React.FC = () => {

	const dispatch = useDispatch();

	const lng = useSelector((state: any) => state.settings.lng);
	const userData = useSelector((state: any) => state.user);

	const { i18n } = useTranslation();

	useEffect(() => {
		dispatch(getLng());
		dispatch(getUser());
	}, []);

	useEffect(() => {
		console.log(userData);
	}, [userData])

	useEffect(() => {
		if (lng) {
			i18n.changeLanguage(lng);
			console.log(lng);
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
