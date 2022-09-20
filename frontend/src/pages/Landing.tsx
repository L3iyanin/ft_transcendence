import { useEffect } from "react";
import Footer from "../components/Footer/Footer";
import TeamSection from "../components/Pages/LandingPage/TeamSection";
import TextSection from "../components/Pages/LandingPage/TextSection";
import TopSection from "../components/Pages/LandingPage/TopSection";
import { auth42 } from "../services/auth/auth42";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { login } from "../reducers/UserSlice";

const Landing = () => {

	const { t } = useTranslation();

	const dispatch = useDispatch();

	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);
		const code = urlParams.get("code");
		if (code) {
			auth42(code)
				.then((res) => {
					// console.log(res.data);
					dispatch(login(res.data));
					toast.success(t("signInSuccess"), {
						position: toast.POSITION.TOP_CENTER,
					});
				})
				.catch((err) => {
					console.log(err);
					toast.error(err.response.data.message, {
						position: toast.POSITION.TOP_CENTER,
					});
				});
		}
	}, [])

	return (
		<>
			<div className="container">
				<TopSection />
				<TextSection />
				<TeamSection />
			</div>
			<Footer />
		</>
	);
};

export default Landing;
