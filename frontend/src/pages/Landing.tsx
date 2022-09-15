import Footer from "../components/Footer/Footer";
import TeamSection from "../components/Pages/LandingPage/TeamSection";
import TextSection from "../components/Pages/LandingPage/TextSection";
import TopSection from "../components/Pages/LandingPage/TopSection";

const Landing = () => {
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
