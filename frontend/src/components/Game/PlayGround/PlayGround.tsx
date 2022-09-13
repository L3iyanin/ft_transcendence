
import PlayerPaddle from "./PlayerPaddle";
import PlayerScore from "./PlayerScore";
import Ball from "./Ball";
import usePlayerMove from "../../../hooks/usePlayerMove";
import useBallMove from "../../../hooks/useBallMove";
import {
	INITIAL_BALL_START_POSITION,
	PADDLE_HEIGHT,
	PLAY_GROUND_HEIGHT,
	PLAY_GROUND_WIDTH,
} from "../../../utils/constants/Game";
import { useEffect, useRef, useState } from "react";

const PlayGround: React.FC<{
	settings: IGameSettings;
}> = ({ settings }) => {
	const { playerY, movePlayer, stopPropagation, playerMoveOnPaddle } =
		usePlayerMove(313, PLAY_GROUND_HEIGHT, PADDLE_HEIGHT);
	

	const { ballPosition } = useBallMove(
		INITIAL_BALL_START_POSITION.x,
		INITIAL_BALL_START_POSITION.y
	);

	const ref = useRef(null);

	return (
		<div
			className={`relative w-full bg-red mt-5 bg-cover bg-center ac rounded-3xl border-4 border-red`}
			style={{
				backgroundImage: `url(${settings.backgroundUrl})`,
				height: `${PLAY_GROUND_HEIGHT}px`,
				width: `${PLAY_GROUND_WIDTH}px`,
				// aspectRatio: '16 / 9'
			}}
			id="playground"
			onMouseMove={movePlayer}
		>
			<PlayerPaddle
				playerMoveOnPaddle={playerMoveOnPaddle}
				PADDLE_HEIGHT={PADDLE_HEIGHT}
				isOnLeft={true}
				top={`${playerY}px`}
			/>
			<PlayerPaddle
				playerMoveOnPaddle={playerMoveOnPaddle}
				PADDLE_HEIGHT={PADDLE_HEIGHT}
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
			<div ref={ref} />
			<Ball
				onMouseMove={stopPropagation}
				top={ballPosition.y}
				left={ballPosition.x}
			/>
		</div>
	);
};

export default PlayGround;
