import Footer from "../components/Footer/Footer";
import TeamSection from "../components/LandingPage/TeamSection";
import TextSection from "../components/LandingPage/TextSection";
import TopSection from "../components/LandingPage/TopSection";

const Landing = () => {
	return (
		<>
			<div className="container mx-auto px-6">
				<TopSection />
				<TextSection />
				<TeamSection />
			</div>
			<Footer />
		</>
	);
};

export default Landing;
