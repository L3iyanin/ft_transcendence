import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Router from "./routes/Router";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from "react-redux";
import { getLng } from "./reducers/SettingsSlice";
import { getUser } from "./reducers/UserSlice";

const App: React.FC = () => {

	const dispatch = useDispatch();

	const lng = useSelector((state: any) => state.settings.lng);

	const { i18n } = useTranslation();

	useEffect(() => {
		dispatch(getLng());
		dispatch(getUser());
		// dispatch(setSocket());
	}, []);

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
