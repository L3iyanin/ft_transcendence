import Footer from "../components/Footer/Footer";
import NavBar from "../components/NavBar/NavBar";
import DiscussionSection from "../components/Pages/Chat/DiscussionSection";

const Chat: React.FC = () => {

	return (
		<>
			<div className="container">
				<NavBar />
				<div className="mt-14" />
				<DiscussionSection />
			</div>
			<Footer />
		</>
	);
}

export default Chat;