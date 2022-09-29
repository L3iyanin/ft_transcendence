import Footer from "../components/Footer/Footer";
import NavBar from "../components/NavBar/NavBar";
import LiveMatches from "../components/Pages/Home/LiveMatches/LiveMatches";
import { liveMatches } from "../utils/data/Match";
import { lastMatches } from "../utils/data/Match";
import GameMode from "../components/Pages/Home/GameMode/GameMode";
import { MatchTypeEnum } from "../utils/constants/enum";
import LastMatches from "../components/LastMatches/LastMatches";
import Leaderboard from "../components/Pages/Home/Leaderboard/Leaderboard";
import UserCard from "../components/UserCard/UserCard";
import { useSelector } from "react-redux";

const Home: React.FC = () => {
	const clientSocket = useSelector((state: any) => state.chat.clientSocket);

	const userData: IUserState = useSelector((state: any) => state.user);

	const playGame = (scoreToWin: number) => {
		clientSocket.emit("joinGame", {
			userId: userData.user?.id,
			scoreToWin: scoreToWin,
		});
	};

	return (
		<>
			<div className="container">
				<NavBar />
				<main className="flex flex-col justify-between items-center gap-20">
					<section className="w-full flex-wrap flex justify-around items-center">
						<UserCard />
						{userData.user && (
							<LiveMatches userId={userData.user.id} />
						)}
					</section>
					<section className="w-full flex flex-col justify-between items-center gap">
						<section className="w-full px-8 flex flex-wrap justify-between items-center mb-10">
							<GameMode
								onPlay={playGame}
								mode={MatchTypeEnum.Classic}
							/>
							<GameMode
								onPlay={playGame}
								mode={MatchTypeEnum.Vip}
							/>
						</section>
						<section className="w-full flex flex-wrap justify-between items-center gap-10">
							<LastMatches matches={lastMatches} />
							<Leaderboard />
						</section>
					</section>
				</main>
			</div>
			<Footer />
		</>
	);
};

export default Home;
