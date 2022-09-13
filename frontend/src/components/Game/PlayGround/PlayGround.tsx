import { IGameSettings } from "../../../utils/types/Game";
import PlayerPaddle from "./PlayerPaddle";
import PlayerScore from "./PlayerScore";
import Ball from "./Ball";

const PlayGround: React.FC<{
	settings: IGameSettings;
}> = ({ settings }) => {
	return (
		<div
			className="relative w-full h-[580px] bg-red mt-5 bg-cover bg-center rounded-3xl border-4 border-red"
			style={{
				backgroundImage: `url(${settings.backgroundUrl})`,
			}}
		>
			<PlayerPaddle isOnLeft={true} top="5%" />
			<PlayerPaddle isOnLeft={false} top="70%" />
			<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-full border-r-2 border-dashed beige-red" />
			<div className="absolute text-white top-4 left-1/2 transform -translate-x-1/2 gap-x-16 flex">
				<PlayerScore player={settings.player1} />
				<PlayerScore player={settings.player2} isReverse={true} />
			</div>
			<Ball top="100px" left="200px" />
		</div>
	);
};

export default PlayGround;
