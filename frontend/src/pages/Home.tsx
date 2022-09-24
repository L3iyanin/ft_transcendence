import Footer from "../components/Footer/Footer";
import NavBar from "../components/NavBar/NavBar";
import LiveMatches from "../components/Pages/Home/LiveMatches/LiveMatches";
import UserCard from "../components/Pages/Home/UserCard/UserCard";

import { users } from "../utils/data/Users";
import { matches } from "../utils/data/Match";
import GameMode from "../components/Pages/Home/GameMode/GameMode";
import { MatchTypeEnum } from "../utils/constants/enum";
import LastMatches from "../components/Pages/Home/LastMatches/LastMatches";
import Leaderboard from "../components/Pages/Home/Leaderboard/LeaderBoard";

const Home: React.FC = () => {
	return (
		<>
			<NavBar />
			<main className="container flex flex-col justify-between items-center gap-20">
				<section className="w-full flex justify-between items-center gap-16">
					<UserCard user={users[0]} />
					<LiveMatches matches={matches} />
				</section>
				<section className="w-full flex flex-col justify-between items-center gap-10">
					<section className="w-full px-8 flex justify-between items-center gap-4">
						<GameMode mode={MatchTypeEnum.Classic} />
						<GameMode mode={MatchTypeEnum.Vip} />
					</section>
					<section className="w-full flex justify-between items-center gap-4">
						<LastMatches matches={matches} />
						<Leaderboard players={users} />
					</section>
				</section>
			</main>
			<Footer />
		</>
	);
};

export default Home;
