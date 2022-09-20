import PlayGround from "../components/Game/PlayGround/PlayGround";
import { fakeGameSettings } from "../utils/data/GamePage";
import TopSection from "../components/Game/TopSection";
import WatchersAndPlayers from "../components/Game/WatchersAndPlayers/WatchersAndPlayers";

import Footer from "../components/Footer/Footer";

const Game: React.FC = () => {
	return (
		<>
			<div className="container">
				<div className="mt-20" />
				<TopSection
					name={fakeGameSettings.name}
					goalsToWin={fakeGameSettings.goalsToWin}
				/>
				<PlayGround settings={fakeGameSettings} />
				<WatchersAndPlayers
					player1={fakeGameSettings.player1}
					player2={fakeGameSettings.player2}
					watchers={fakeGameSettings.watchers}
				/>
			</div>
			<Footer />
		</>
	);
};

export default Game;
