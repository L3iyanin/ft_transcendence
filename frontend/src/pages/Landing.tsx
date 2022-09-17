import { useEffect } from "react";
import Footer from "../components/Footer/Footer";
import TeamSection from "../components/Pages/LandingPage/TeamSection";
import TextSection from "../components/Pages/LandingPage/TextSection";
import TopSection from "../components/Pages/LandingPage/TopSection";
import { auth42 } from "../services/auth/auth42";
import { toast } from "react-toastify";

const Landing = () => {

	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);
		const code = urlParams.get("code");
		if (code) {
			auth42(code)
				.then((res) => {
					console.log(res);
					// toast.success("You login success !!", {
					// 	position: toast.POSITION.TOP_CENTER,
					// });
					toast("Wow so easy!", {
						position: toast.POSITION.TOP_CENTER,
					});
				})
				.catch((err) => {
					console.log(err);
					toast.error("You login success !!", {
						position: toast.POSITION.TOP_CENTER,
						pauseOnFocusLoss: false
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
