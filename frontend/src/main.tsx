import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/global.scss";
import "./i18n/config";
import { Provider } from "react-redux";
import store from "./store/store";
import axios from "axios";
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

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	// <React.StrictMode>
	<Provider store={store}>
		<App />
	</Provider>
	// </React.StrictMode>
);
