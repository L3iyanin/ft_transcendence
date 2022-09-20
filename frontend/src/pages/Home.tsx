import Footer from "../components/Footer/Footer";
import NavBar from "../components/NavBar/NavBar";
import LiveMatches from "../components/Pages/Home/LiveMatches/LiveMatches";
import UserCard from "../components/Pages/Home/UserCard/UserCard";

import { users } from "../utils/data/Users"

const Home: React.FC = () => {

	return (
		<>
		<NavBar />
			<main>
				<section>
					<UserCard  user={users[0]}/>
					<LiveMatches matches={} />
				</section>
			</main>
			<Footer />
		</>
	);
}

export default Home;