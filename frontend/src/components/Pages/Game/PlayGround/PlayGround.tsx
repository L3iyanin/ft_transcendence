import PlayerPaddle from "./PlayerPaddle";
import PlayerScore from "./PlayerScore";
import Ball from "./Ball";
import usePlayerMove from "../../../../hooks/usePlayerMove";
import useBallMove from "../../../../hooks/useBallMove";
import {
	BALL_SIZE,
	CLASSIC_GAME_BG,
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
	VIP_GAME_BG,
} from "../../../../utils/constants/Game";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import LoadingSpinner from "../../../UI/Loading/LoadingSpinner";
import { MatchTypeEnum } from "../../../../utils/constants/enum";

const PlayGround: React.FC<{
	matchSettings?: IStartedMatch;
}> = ({ matchSettings }) => {

	const [playerIndex, setPlayerIndex] = useState<number>(PLAYER_ONE);

	const LocalUserData = useSelector((state: any) => state.user.user);

	const clientSocket  = useSelector((state: any) => state.chat.clientSocket);

	const [playersScore, setPlayersScore] = useState<{
		player1Score: number;
		player2Score: number;
	}>({
		player1Score: 0,
		player2Score: 0,
	});

	useEffect(() => {
		
		if (LocalUserData && clientSocket && matchSettings) {
			if (matchSettings.player1.id !== LocalUserData.id) {
				setPlayerIndex(PLAYER_TWO);
			}
	
			clientSocket.emit("readyToPlay", {
				userId: LocalUserData.id,
				matchId: matchSettings.matchId,
			});

			clientSocket.on("gameState", (gameState: IGameState) => {
				console.log(gameState);
				updateBall(gameState.ballX, gameState.ballY);
				setPlayersScore({
					player1Score: gameState.player1Score,
					player2Score: gameState.player2Score,
				});

				if (matchSettings.player1.id !== LocalUserData.id) {
					updatePlayer1Y(gameState.player1y);
				}
				else {
					updatePlayer2Y(gameState.player2y);
				}
			})

			// clientSocket.on("")

		}

	}, [clientSocket, LocalUserData, matchSettings]);

	const {
		playerY: player1Y,
		movePlayerByMouse: movePlayer1ByMouse,
		updatePlayerY: updatePlayer1Y,
		// updatePlayerPosition: updatePlayerPosition1,
	} = usePlayerMove(PLAYER_FIRST_POSITION, PLAYER_ONE);

	const {
		playerY: player2Y,
		movePlayerByMouse: movePlayer2ByMouse,
		updatePlayerY: updatePlayer2Y,
		// updatePlayerPosition: updatePlayerPosition2
	} = usePlayerMove(PLAYER_FIRST_POSITION, PLAYER_TWO);

	// const setPlayersScoreHandler = (
	// 	playerIndex: number,
	// 	goalsOnPlayer: number
	// ) => {
	// 	setPlayersScore((prevState) => {
	// 		const newPlayerScore = { ...prevState };
	// 		if (playerIndex === PLAYER_ONE) {
	// 			newPlayerScore.player1Score += goalsOnPlayer;
	// 		} else {
	// 			newPlayerScore.player2Score += goalsOnPlayer;
	// 		}
	// 		return newPlayerScore;
	// 	});
	// };

	const { ballPosition, updateBall } = useBallMove();

	const ref = useRef(null);

	const movePlayer = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		if (playerIndex === PLAYER_ONE) {
			movePlayer1ByMouse(e);
		}
		else {
			movePlayer2ByMouse(e);
		}
	};

	const playgroundRef = useRef<HTMLDivElement>(null);

	useLayoutEffect(() => {
		// if (playgroundRef.current) {
		// 	window.playgroundWidth = playgroundRef.current.offsetWidth;
		// 	window.playgroundHeight = playgroundRef.current.offsetHeight;

		// 	window.widthRatio = playgroundRef.current.offsetWidth / PLAY_GROUND_WIDTH;
		// 	window.heightRatio = playgroundRef.current.offsetHeight / PLAY_GROUND_HEIGHT;
			
		// 	window.paddleHeight = PADDLE_HEIGHT * window.heightRatio;
		// 	window.paddleWidth = PADDLE_WIDTH * window.widthRatio;

		// 	window.paddleXMargin = PADDLE_X_MARGIN * window.widthRatio;
		// 	window.paddleYMargin = PADDLE_Y_MARGIN * window.heightRatio;

		// 	window.ballSize = BALL_SIZE * window.widthRatio;

		// 	window.ballXPosition = window.playgroundWidth / 2 -
		// 			window.ballSize / 2 +
		// 			PLAYGROUND_BORDERSIZE +
		// 			window.paddleXMargin / 2 - 2;

		// 	window.ballYPosition = window.playgroundHeight / 2 -
		// 			window.ballSize / 2 +
		// 			PLAYGROUND_BORDERSIZE +
		// 			window.paddleYMargin / 2 - 2;

		// 	window.ballXPositionRatio = window.ballXPosition / window.playgroundWidth;
		// 	window.ballYPositionRatio = window.ballYPosition / window.playgroundHeight;

		// 	updatePlayerPosition1(PLAYER_ONE);
		// 	updatePlayerPosition2(PLAYER_TWO);
		// }
	}, []);

	useEffect(() => {
		// addEventListener("resize", () => {
		// 	if (playgroundRef.current) {
		// 		window.widthRatio = playgroundRef.current.offsetWidth / PLAY_GROUND_WIDTH;
		// 		window.heightRatio = playgroundRef.current.offsetHeight / PLAY_GROUND_HEIGHT;

		// 		if (isNaN(window.player1Y)) {
		// 			window.player1Y = PLAYER_FIRST_POSITION;
		// 		}

		// 		if (isNaN(window.player2Y)) {
		// 			window.player2Y = PLAYER_FIRST_POSITION;
		// 		}

		// 		window.player1YPositionRatio = window.player1Y / window.playgroundHeight;
		// 		window.player2YPositionRatio = window.player2Y / window.playgroundHeight;
				

		// 		window.ballXPositionRatio = window.ballXPosition / window.playgroundWidth;
		// 		window.ballYPositionRatio = window.ballYPosition / window.playgroundHeight;

		// 		window.playgroundWidth = playgroundRef.current.offsetWidth;
		// 		window.playgroundHeight = playgroundRef.current.offsetHeight;
				
		// 		window.paddleHeight = PADDLE_HEIGHT * window.heightRatio;
		// 		window.paddleWidth = PADDLE_WIDTH * window.widthRatio;
				
				
		// 		window.paddleXMargin = PADDLE_X_MARGIN * window.widthRatio;
		// 		window.paddleYMargin = PADDLE_Y_MARGIN * window.heightRatio;
				
		// 		window.ballSize = BALL_SIZE * window.widthRatio;
				
		// 		updateBallOutside();

		// 		updatePlayerPosition1(PLAYER_ONE);
		// 		updatePlayerPosition2(PLAYER_TWO);
				
				
		// 	}
		// });
	}, []);

	if (!matchSettings)
		return <LoadingSpinner />;

	const playgroundBg = matchSettings.scoreToWin === MatchTypeEnum.Classic ?  CLASSIC_GAME_BG : VIP_GAME_BG;

	return (
		<div
			className={`relative w-full bg-red mt-5 bg-cover bg-center rounded-3xl border-4 border-red`}
			style={{
				backgroundImage: `url(${playgroundBg})`,
				height: `${PLAY_GROUND_HEIGHT}px`,
				width: `${PLAY_GROUND_WIDTH}px`,
				// aspectRatio: "16 / 9",
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
					player={matchSettings.player1}
				/>
				<PlayerScore
					score={playersScore.player2Score}
					player={matchSettings.player2}
					isReverse={true}
				/>
			</div>
			<Ball
				// top={window.ballYPosition}
				// left={window.ballXPosition}
				top={ballPosition.y}
				left={ballPosition.x}
			/>
			<div className="relative w-full h-full rounded-2xl" onMouseMove={movePlayer} />
			<div ref={ref} />
		</div>
	);
};

export default PlayGround;
