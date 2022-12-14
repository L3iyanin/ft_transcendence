import { useEffect, useState } from "react";
import Footer from "../components/Footer/Footer";
import TeamSection from "../components/Pages/LandingPage/TeamSection";
import TextSection from "../components/Pages/LandingPage/TextSection";
import TopSection from "../components/Pages/LandingPage/TopSection";
import { auth42 } from "../services/auth/auth42";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { login } from "../reducers/UserSlice";
import LoadingSpinner from "../components/UI/Loading/LoadingSpinner";
import TwoFAPopup from "../components/Pages/LandingPage/TwoFAPopup";
import { useNavigate } from "react-router-dom";

const Landing = () => {
	const { t } = useTranslation();

	const dispatch = useDispatch();

	const [open2FA, setOpen2FA] = useState<boolean>(false);

	const [userId, setUserId] = useState<string | null>(null);

	const [isLoading, setIsLoading] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);
		const code = urlParams.get("code");
		setIsLoading(true);
		if (code) {
			auth42(code)
				.then((res) => {
					dispatch(login(res.data));
					toast.success(t("signInSuccess"), {
						position: toast.POSITION.TOP_CENTER,
					});
				})
				.catch((err) => {
					console.error(err.response);
					if (err.response.status === 403) {
						setOpen2FA(true);
						setUserId(err.response.data.userId);
						setIsLoading(false);
						return ;
					}
					toast.error(err.response.data.message, {
						position: toast.POSITION.TOP_CENTER,
					});
				});
		}
		else {
			setIsLoading(false);
		}
	}, []);

	if (isLoading) {
		return <LoadingSpinner />;
	}

	return (
		<>
			<TwoFAPopup
				open={open2FA}
				setOpen={setOpen2FA}
				userId={userId}
				/>
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
