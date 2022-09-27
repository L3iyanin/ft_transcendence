import Footer from "../components/Footer/Footer";
import NavBar from "../components/NavBar/NavBar";
import LiveMatches from "../components/Pages/Home/LiveMatches/LiveMatches";


import { users } from "../utils/data/Users";
import { liveMatches } from "../utils/data/Match";
import { lastMatches } from "../utils/data/Match";
import GameMode from "../components/Pages/Home/GameMode/GameMode";
import { MatchTypeEnum } from "../utils/constants/enum";
import LastMatches from "../components/LastMatches/LastMatches";
import Leaderboard from "../components/Pages/Home/Leaderboard/Leaderboard";
import UserCard from "../components/UserCard/UserCard";

const Home: React.FC = () => {
	return (
		<div className="container">
			<NavBar />
			<main className="flex flex-col justify-between items-center gap-20">
				<section className="w-full flex justify-between items-center gap-16">
					<UserCard />
					<LiveMatches matches={liveMatches} />
				</section>
				<section className="w-full flex flex-col justify-between items-center gap-10">
					<section className="w-full px-8 flex justify-between items-center gap-4">
						<GameMode mode={MatchTypeEnum.Classic} />
						<GameMode mode={MatchTypeEnum.Vip} />
					</section>
					<section className="w-full flex justify-between items-center gap-10">
						<LastMatches matches={lastMatches}/>
						<Leaderboard players={users} />
					</section>
				</section>
			</main>
			<Footer />
		</div>
	);
};

export default Home;
