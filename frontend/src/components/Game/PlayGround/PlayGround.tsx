import PlayerPaddle from "./PlayerPaddle";
import PlayerScore from "./PlayerScore";
import Ball from "./Ball";
import usePlayerMove from "../../../hooks/usePlayerMove";
import useBallMove from "../../../hooks/useBallMove";
import {
	INITIAL_BALL_START_POSITION,
	PADDLE_HEIGHT,
	PLAYER_ONE,
	PLAYER_TWO,
	PLAY_GROUND_HEIGHT,
	PLAY_GROUND_WIDTH,
} from "../../../utils/constants/Game";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

const PlayGround: React.FC<{
	settings: IGameSettings;
}> = ({ settings }) => {
	const [playersScore, setPlayersScore] = useState<{
		player1Score: number;
		player2Score: number;
	}>({
		player1Score: 0,
		player2Score: 0,
	});

	const {
		playerY: player1Y,
		movePlayer: movePlayer1,
		stopPropagation,
		playerMoveOnPaddle: player1MoveOnPaddle,
	} = usePlayerMove(313, PADDLE_HEIGHT, PLAYER_ONE);

	const {
		playerY: player2Y,
		movePlayer: movePlayer2,
		playerMoveOnPaddle: player2MoveOnPaddle,
	} = usePlayerMove(313, PADDLE_HEIGHT, PLAYER_TWO);

	const setPlayersScoreHandler = (
		playerIndex: number,
		goalsOnPlayer: number
	) => {
		setPlayersScore((prevState) => {
			const newPlayerScore = { ...prevState };
			if (playerIndex === PLAYER_ONE) {
				// console.log("player1");
				newPlayerScore.player1Score += goalsOnPlayer;
			} else {
				// console.log("player2");
				newPlayerScore.player2Score += goalsOnPlayer;
			}
			return newPlayerScore;
		});
	};

	const { ballPosition } = useBallMove(setPlayersScoreHandler);

	const ref = useRef(null);

	const movePlayer = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		movePlayer1(e);
		movePlayer2(e);
	};

	const playgroundRef = useRef<HTMLDivElement>(null);

	useLayoutEffect(() => {
		window.playgroundWidth = playgroundRef.current.offsetWidth;
		window.playgroundHeight = playgroundRef.current.offsetHeight;
		window.widthRatio = playgroundRef.current.offsetWidth / PLAY_GROUND_WIDTH;
		window.heightRatio = playgroundRef.current.offsetHeight / PLAY_GROUND_HEIGHT;
	}, []);

	useEffect(() => {
		addEventListener("resize", () => {
			window.widthRatio = playgroundRef.current.offsetWidth / PLAY_GROUND_WIDTH;
			window.heightRatio = playgroundRef.current.offsetHeight / PLAY_GROUND_HEIGHT;

			window.playgroundWidth = playgroundRef.current.offsetWidth;
			window.playgroundHeight = playgroundRef.current.offsetHeight;
		});
	}, []);

	return (
		<div
			className={`relative w-full bg-red mt-5 bg-cover bg-center ac rounded-3xl border-4 border-red`}
			style={{
				backgroundImage: `url(${settings.backgroundUrl})`,
				// height: `${PLAY_GROUND_HEIGHT}px`,
				// width: `${PLAY_GROUND_WIDTH}px`,
				aspectRatio: "16 / 9",
			}}
			id="playground"
			// onMouseMove={movePlayer1}
			onMouseMove={movePlayer}
			ref={playgroundRef}
		>
			<PlayerPaddle
				playerMoveOnPaddle={player1MoveOnPaddle}
				PADDLE_HEIGHT={PADDLE_HEIGHT}
				isOnLeft={true}
				top={`${player1Y}px`}
			/>
			<PlayerPaddle
				playerMoveOnPaddle={player2MoveOnPaddle}
				PADDLE_HEIGHT={PADDLE_HEIGHT}
				isOnLeft={false}
				top={`${player2Y}px`}
			/>
			<div
				onMouseMove={stopPropagation}
				className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-full border-r-2 border-dashed border-beige"
			/>
			<div
				onMouseMove={stopPropagation}
				className="absolute text-white top-4 left-1/2 transform -translate-x-1/2 gap-x-16 flex"
			>
				<PlayerScore
					score={playersScore.player1Score}
					player={settings.player1}
				/>
				<PlayerScore
					score={playersScore.player2Score}
					player={settings.player2}
					isReverse={true}
				/>
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
