import PlayGround from "../components/Pages/Game/PlayGround/PlayGround";
import { fakeGameSettings, fakeMatchWatchers } from "../utils/data/GamePage";
import TopSection from "../components/Pages/Game/TopSection";
import WatchersAndPlayers from "../components/Pages/Game/WatchersAndPlayers/WatchersAndPlayers";
import Footer from "../components/Footer/Footer";
import NavBar from "../components/NavBar/NavBar";
import useGetGameName from "../hooks/useGetGame";

const Game: React.FC = () => {
	return (
		<div className="container">
			<NavBar />
			<div className="mt-10" />
			<TopSection
				name={useGetGameName(fakeGameSettings.scoreToWin).name}
				goalsToWin={fakeGameSettings.scoreToWin}
			/>
			<PlayGround settings={fakeGameSettings} />
			<WatchersAndPlayers
				player1={fakeGameSettings.player1}
				player2={fakeGameSettings.player2}
				watchers={fakeMatchWatchers}
			/>
			<Footer />
		</div>
	);
};

export default Game;
