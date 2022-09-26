import PlayGround from "../components/Pages/Game/PlayGround/PlayGround";
import { fakeGameSettings, fakeMatchWatchers } from "../utils/data/GamePage";
import TopSection from "../components/Pages/Game/TopSection";
import WatchersAndPlayers from "../components/Pages/Game/WatchersAndPlayers/WatchersAndPlayers";
import Footer from "../components/Footer/Footer";
import NavBar from "../components/NavBar/NavBar";
import useGetGameName from "../hooks/useGetGame";
import { useSelector } from "react-redux";
import LoadingSpinner from "../components/UI/Loading/LoadingSpinner";

const Game: React.FC = () => {
	
	const matchData: IMatchState = useSelector((state: any) => state.match);

	if (!matchData.match) {
		return (
			<div className="container">
				<NavBar />
				<LoadingSpinner />
			</div>
		);
	}

	return (
		<>
			<div className="container">
				<NavBar />
				<div className="mt-10" />
				<TopSection
					name={useGetGameName(matchData.match.scoreToWin).name}
					goalsToWin={matchData.match.scoreToWin}
				/>
				<PlayGround matchSettings={matchData.match} playgroundBg={useGetGameName(matchData.match.scoreToWin).background} />
				<WatchersAndPlayers
					player1={matchData.match.player1}
					player2={matchData.match.player2}
					watchers={fakeMatchWatchers}
				/>
			</div>
			<Footer />
		</>
	);
};

export default Game;
