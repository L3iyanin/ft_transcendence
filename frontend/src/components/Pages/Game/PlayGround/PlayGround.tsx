import PlayerPaddle from "./PlayerPaddle";
import PlayerScore from "./PlayerScore";
import Ball from "./Ball";
import usePlayerMove from "../../../../hooks/usePlayerMove";
import useBallMove from "../../../../hooks/useBallMove";
import {
	BALL_SIZE,
	PADDLE_HEIGHT,
	PADDLE_WIDTH,
	PADDLE_X_MARGIN,
	PADDLE_Y_MARGIN,
	PLAYER_FIRST_POSITION,
	PLAYER_ONE,
	PLAYER_TWO,
	PLAYGROUND_BORDERSIZE,
	PLAY_GROUND_HEIGHT,
	PLAY_GROUND_WIDTH,
} from "../../../../utils/constants/Game";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

const PlayGround: React.FC<{
	settings: IMatch;
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
		updatePlayerPosition: updatePlayerPosition1,
	} = usePlayerMove(PLAYER_FIRST_POSITION, PLAYER_ONE);

	const {
		playerY: player2Y,
		movePlayer: movePlayer2,
		updatePlayerPosition: updatePlayerPosition2
	} = usePlayerMove(PLAYER_FIRST_POSITION, PLAYER_TWO);

	const setPlayersScoreHandler = (
		playerIndex: number,
		goalsOnPlayer: number
	) => {
		setPlayersScore((prevState) => {
			const newPlayerScore = { ...prevState };
			if (playerIndex === PLAYER_ONE) {
				newPlayerScore.player1Score += goalsOnPlayer;
			} else {
				newPlayerScore.player2Score += goalsOnPlayer;
			}
			return newPlayerScore;
		});
	};

	const { ballPosition, updateBallOutside, setBallPosition } = useBallMove(setPlayersScoreHandler);

	const ref = useRef(null);

	const movePlayer = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		// console.log(`e.clientY: ${e.clientY - e.target.getBoundingClientRect().top}`);
		// console.log(`e.screenY: ${e.screenY}`);
		movePlayer1(e);
		movePlayer2(e);
	};

	const playgroundRef = useRef<HTMLDivElement>(null);

	useLayoutEffect(() => {
		if (playgroundRef.current) {
			window.playgroundWidth = playgroundRef.current.offsetWidth;
			window.playgroundHeight = playgroundRef.current.offsetHeight;

			window.widthRatio = playgroundRef.current.offsetWidth / PLAY_GROUND_WIDTH;
			window.heightRatio = playgroundRef.current.offsetHeight / PLAY_GROUND_HEIGHT;
			
			window.paddleHeight = PADDLE_HEIGHT * window.heightRatio;
			window.paddleWidth = PADDLE_WIDTH * window.widthRatio;

			window.paddleXMargin = PADDLE_X_MARGIN * window.widthRatio;
			window.paddleYMargin = PADDLE_Y_MARGIN * window.heightRatio;

			window.ballSize = BALL_SIZE * window.widthRatio;

			// setBallPosition(prevBallState => ({
			// 	...prevBallState,
			// 	x: prevBallState.x * window.widthRatio,
			// 	y: prevBallState.y * window.heightRatio,
			// }))

			window.ballXPoistion = window.playgroundWidth / 2 -
					window.ballSize / 2 +
					PLAYGROUND_BORDERSIZE +
					window.paddleXMargin / 2 - 2;

			window.ballYPoistion = window.playgroundHeight / 2 -
					window.ballSize / 2 +
					PLAYGROUND_BORDERSIZE +
					window.paddleYMargin / 2 - 2;

			console.log("kjdsahkjghkasjdhgkjasdhgkjhasdkjghkajsdhgkjhkksadjhgkjhs")

			window.ballXPositionRatio = window.ballXPoistion / window.playgroundWidth;
			window.ballYPositionRatio = window.ballYPoistion / window.playgroundHeight;

			updatePlayerPosition1(PLAYER_ONE);
			updatePlayerPosition2(PLAYER_TWO);
		}
	}, []);

	useEffect(() => {
		addEventListener("resize", () => {
			if (playgroundRef.current) {
				window.widthRatio = playgroundRef.current.offsetWidth / PLAY_GROUND_WIDTH;
				window.heightRatio = playgroundRef.current.offsetHeight / PLAY_GROUND_HEIGHT;

				if (isNaN(window.player1Y)) {
					window.player1Y = PLAYER_FIRST_POSITION;
				}

				if (isNaN(window.player2Y)) {
					window.player2Y = PLAYER_FIRST_POSITION;
				}

				window.player1YPositionRatio = window.player1Y / window.playgroundHeight;
				window.player2YPositionRatio = window.player2Y / window.playgroundHeight;
				
				// if (window.playgroundWidth !== playgroundRef.current.offsetWidth) {
					window.ballXPositionRatio = window.ballXPoistion / window.playgroundWidth;
					window.ballYPositionRatio = window.ballYPoistion / window.playgroundHeight;
				// }
				
				// setBallPosition(prevBallState => {
				// 	console.log(`newX: ${window.playgroundWidth * window.ballXPositionRatio}`)
				// 	return {
				// 		...prevBallState,
				// 		x: window.playgroundWidth * window.ballXPositionRatio,
				// 		y: playgroundRef.current.offsetHeight * window.ballYPositionRatio,
				// 	}
				// })

				
				
				window.playgroundWidth = playgroundRef.current.offsetWidth;
				window.playgroundHeight = playgroundRef.current.offsetHeight;
				
				window.paddleHeight = PADDLE_HEIGHT * window.heightRatio;
				window.paddleWidth = PADDLE_WIDTH * window.widthRatio;
				
				
				window.paddleXMargin = PADDLE_X_MARGIN * window.widthRatio;
				window.paddleYMargin = PADDLE_Y_MARGIN * window.heightRatio;
				
				window.ballSize = BALL_SIZE * window.widthRatio;
				
				updateBallOutside();

				updatePlayerPosition1(PLAYER_ONE);
				updatePlayerPosition2(PLAYER_TWO);
				
				
			}
		});
	}, []);

	return (
		<div
			className={`relative w-full bg-red mt-5 bg-cover bg-center rounded-3xl border-4 border-red`}
			style={{
				backgroundImage: `url(${settings.backgroundUrl})`,
				// height: `${PLAY_GROUND_HEIGHT}px`,
				// width: `${PLAY_GROUND_WIDTH}px`,
				aspectRatio: "16 / 9",
			}}
			id="playground"
			ref={playgroundRef}
		>
			<PlayerPaddle
				isOnLeft={true}
				top={`${player1Y}px`}
			/>
			<PlayerPaddle
				isOnLeft={false}
				top={`${player2Y}px`}
			/>
			<div
				className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-full border-r-2 border-dashed border-beige"
			/>
			<div
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
			<Ball
				top={window.ballYPoistion}
				left={window.ballXPoistion}
			/>
			<div className="relative w-full h-full rounded-2xl" onMouseMove={movePlayer} />
			<div ref={ref} />
		</div>
	);
};

export default PlayGround;
