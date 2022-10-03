import PlayGround from "../components/Pages/Game/PlayGround/PlayGround";
import TopSection from "../components/Pages/Game/TopSection";
import WatchersAndPlayers from "../components/Pages/Game/WatchersAndPlayers/WatchersAndPlayers";
import Footer from "../components/Footer/Footer";
import NavBar from "../components/NavBar/NavBar";
import { useSelector } from "react-redux";

const Game: React.FC = () => {

	const matchData: IMatchState = useSelector((state: any) => state.match);

	return (
		<>
			<div className="container">
				<NavBar />
				<div className="mt-10" />
				<TopSection
					goalsToWin={matchData.match?.scoreToWin}
				/>
				
				<PlayGround matchSettings={matchData.match} />
				<WatchersAndPlayers
					matchSettings={matchData.match}
					watchers={matchData.spectators}
				/>
			</div>
			{ matchData.match && <Footer /> }
		</>
	);
};

export default Game;
