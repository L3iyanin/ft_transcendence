import Footer from "../components/Footer/Footer";
import NavBar from "../components/NavBar/NavBar";
import LiveMatches from "../components/Pages/Home/LiveMatches/LiveMatches";
import UserCard from "../components/Pages/Home/UserCard/UserCard";

import { users } from "../utils/data/Users"
import { matches } from "../utils/data/Match"
import GameMode from "../components/Pages/Home/GameMode/GameMode";
import { MatchTypeEnum } from "../utils/constants/enum";

const Home: React.FC = () => {

	return (
		<>
		<NavBar />
			<main className="container flex flex-col justify-between items-center gap-4">
				<section className="container flex justify-between items-center">
					<UserCard  user={users[0]}/>
					<LiveMatches matches={matches} />
				</section>
				<section className="container flex justify-between items-center gap-4">
					<GameMode mode={MatchTypeEnum.Classic} />
					<GameMode mode={MatchTypeEnum.Vip} />
				</section>
			</main>
			<Footer />
		</>
	);
}

export default Home;