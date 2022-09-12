import { IGameSettings } from "../../../utils/types/Game";
import PlayerPaddle from "./PlayerPaddle";
import PlayerScore from "./PlayerScore";
import Ball from "./Ball";
import usePlayerMove from "../../../hooks/usePlayerMove";
import useBallMove from "../../../hooks/useBallMove";
import { INITIAL_BALL_START_POSITION, paddleHeight, playGorundHeight } from "../../../utils/constants/Game";

const PlayGround: React.FC<{
	settings: IGameSettings;
}> = ({ settings }) => {
	const { playerX, movePlayer, stopPropagation, playerMoveOnPaddle } =
		usePlayerMove(290, playGorundHeight, paddleHeight);
	
	const { ballPosition } = useBallMove(INITIAL_BALL_START_POSITION);

	return (
		<div
			className={`relative w-full bg-red mt-5 bg-cover bg-center rounded-3xl border-4 border-red`}
			style={{
				backgroundImage: `url(${settings.backgroundUrl})`,
				height: `${playGorundHeight}px`,
			}}
			id="playground"
			onMouseMove={movePlayer}
		>
			<PlayerPaddle
				playerMoveOnPaddle={playerMoveOnPaddle}
				paddleHeight={paddleHeight}
				isOnLeft={true}
				top={`${playerX}px`}
			/>
			<PlayerPaddle
				playerMoveOnPaddle={playerMoveOnPaddle}
				paddleHeight={paddleHeight}
				isOnLeft={false}
				top="70%"
			/>
			<div
				onMouseMove={stopPropagation}
				className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-full border-r-2 border-dashed border-beige"
			/>
			<div
				onMouseMove={stopPropagation}
				className="absolute text-white top-4 left-1/2 transform -translate-x-1/2 gap-x-16 flex"
			>
				<PlayerScore player={settings.player1} />
				<PlayerScore player={settings.player2} isReverse={true} />
			</div>
			<Ball onMouseMove={stopPropagation} top={ballPosition.x} left={ballPosition.y} />
		</div>
	);
};

export default PlayGround;
