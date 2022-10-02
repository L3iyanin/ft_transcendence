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
	SPECTATOR,
	VIP_GAME_BG,
} from "../../../../utils/constants/Game";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import LoadingSpinner from "../../../UI/Loading/LoadingSpinner";
import { MatchTypeEnum } from "../../../../utils/constants/enum";
import { fakematch } from "../../../../utils/data/Match";
import WinnerOverlay from "./WinnerOverlay";
import usePrompt from "../../../../hooks/usePropmpt";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

let isFirstRnder = true;

const PlayGround: React.FC<{
	matchSettings?: IStartedMatch;
}> = ({ matchSettings }) => {
	// const [matchPlayed, setMatchPlayed] = useState(false);

	// const [refresher, setRefresher] = useState(0);

	const [playerIndex, setPlayerIndex] = useState<number>(PLAYER_ONE);

	const LocalUserData = useSelector((state: any) => state.user.user);

	const clientSocket = useSelector((state: any) => state.chat.clientSocket);

	const [winner, setWinner] = useState<number | null>(null);

	const [playersScore, setPlayersScore] = useState<{
		player1Score: number;
		player2Score: number;
	}>({
		player1Score: 0,
		player2Score: 0,
	});

	const { t } = useTranslation();

	const navigate = useNavigate();

	// usePrompt(t("gamePage.quit_helper"), matchPlayed);

	useEffect(() => {
		if (LocalUserData && clientSocket && matchSettings) {
			if (matchSettings.player1.id === LocalUserData.id) {
				setPlayerIndex(PLAYER_ONE);
				clientSocket.emit("readyToPlay", {
					userId: LocalUserData.id,
					matchId: matchSettings.matchId,
				});
			}
			else if (matchSettings.player2.id === LocalUserData.id) {
				setPlayerIndex(PLAYER_TWO);
				clientSocket.emit("readyToPlay", {
					userId: LocalUserData.id,
					matchId: matchSettings.matchId,
				});
			}
			else {
				setPlayerIndex(SPECTATOR);
			}

			clientSocket.emit("connectUser", {
				username: LocalUserData.username,
				fullName: LocalUserData.fullName,
				id: LocalUserData.id,
			});


			clientSocket.on("gameState", (gameState: IGameState) => {
				// setMatchPlayed(true);

				updateBall(gameState.ballX, gameState.ballY);
				
				setPlayersScore({
					player1Score: gameState.player1Score,
					player2Score: gameState.player2Score,
				});

				if (isFirstRnder === true) {
					updatePlayer1Y(gameState.player1y / PLAY_GROUND_HEIGHT * window.playgroundHeight);
					updatePlayer2Y(gameState.player2y / PLAY_GROUND_HEIGHT * window.playgroundHeight);
					isFirstRnder = false;
				}

				if (matchSettings.player2.id === LocalUserData.id) {
					updatePlayer1Y(gameState.player1y / PLAY_GROUND_HEIGHT * window.playgroundHeight);
				}
				else {
					updatePlayer2Y(gameState.player2y / PLAY_GROUND_HEIGHT * window.playgroundHeight);
				}
			});


			clientSocket.on("gameStateSpectators", (gameState: IGameState) => {

				updateBall(gameState.ballX, gameState.ballY);

				setPlayersScore({
					player1Score: gameState.player1Score,
					player2Score: gameState.player2Score,
				});

				updatePlayer1Y(gameState.player1y / PLAY_GROUND_HEIGHT * window.playgroundHeight);
				updatePlayer2Y(gameState.player2y / PLAY_GROUND_HEIGHT * window.playgroundHeight);
			});

			clientSocket.on("gameOver", (data: IGameOver) => {
				// console.log("gameOver", data);
				if (data.player1Score > data.player2Score) {
					setWinner(PLAYER_ONE);
				} else {
					setWinner(PLAYER_TWO);
				}

				clientSocket.emit("connectUser", {
					username: LocalUserData.username,
					fullName: LocalUserData.fullName,
					id: LocalUserData.id,
				});

				toast.info(t("gameEnd"), {
					position: toast.POSITION.TOP_CENTER,
				});

				setTimeout(() => {
					navigate("/home");
				}, 2000);

			});
		}
	}, [clientSocket, LocalUserData, matchSettings]);

	const {
		playerY: player1Y,
		movePlayerByMouse: movePlayer1ByMouse,
		updatePlayerY: updatePlayer1Y,
		updatePlayerPositionOutside: updatePlayerPosition1Outside,
	} = usePlayerMove(PLAYER_FIRST_POSITION, PLAYER_ONE);

	const {
		playerY: player2Y,
		movePlayerByMouse: movePlayer2ByMouse,
		updatePlayerY: updatePlayer2Y,
		updatePlayerPositionOutside: updatePlayerPosition2Outside,
	} = usePlayerMove(PLAYER_FIRST_POSITION, PLAYER_TWO);

	const { updateBall } = useBallMove();

	const ref = useRef(null);

	const movePlayer = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		if (playerIndex === PLAYER_ONE) {
			movePlayer1ByMouse(e);
		} else if (playerIndex === PLAYER_TWO) {
			movePlayer2ByMouse(e);
		}
	};

	const playgroundRef = useRef<HTMLDivElement>(null);

	useLayoutEffect(() => {
		if (playgroundRef.current) {
			window.playgroundWidth = playgroundRef.current.offsetWidth;
			window.playgroundHeight = playgroundRef.current.offsetHeight;

			window.widthRatio =
				playgroundRef.current.offsetWidth / PLAY_GROUND_WIDTH;
			window.heightRatio =
				playgroundRef.current.offsetHeight / PLAY_GROUND_HEIGHT;

			updatePlayerPosition1Outside(PLAYER_ONE);
			updatePlayerPosition2Outside(PLAYER_TWO);
		}
	}, [playgroundRef.current]);

	useEffect(() => {
		addEventListener("resize", () => {
			if (playgroundRef.current) {
				window.playgroundWidth = playgroundRef.current.offsetWidth;
				window.playgroundHeight = playgroundRef.current.offsetHeight;

				window.widthRatio = playgroundRef.current.offsetWidth / PLAY_GROUND_WIDTH;
				window.heightRatio = playgroundRef.current.offsetHeight / PLAY_GROUND_HEIGHT;

				updatePlayerPosition1Outside(PLAYER_ONE);
				updatePlayerPosition2Outside(PLAYER_TWO);
			}
		});
	}, []);

	if (!matchSettings) {
		return (
			<div
				className={`relative w-full mt-5 bg-cover bg-center rounded-3xl border-4 border-transparent`}
				style={{
					aspectRatio: "16 / 9",
				}}
				id="playground"
				ref={playgroundRef}
			>
				<LoadingSpinner />
			</div>
		);
	}


	const isForClassic = matchSettings.scoreToWin === MatchTypeEnum.Classic;

	return (
		<div
			className={`relative w-full mt-5 bg-cover bg-center rounded-3xl border-4 ${ isForClassic ? "border-red" : "border-yellow"}`}
			style={{
				backgroundImage: `url(${isForClassic ? CLASSIC_GAME_BG : VIP_GAME_BG})`,
				aspectRatio: "16 / 9",
			}}
			id="playground"
			ref={playgroundRef}
		>
			{winner && (
				<WinnerOverlay
					winner={winner}
					player1={matchSettings.player1}
					player2={matchSettings.player2}
				/>
			)}
			<PlayerPaddle isOnLeft={true} top={`${window.player1Y}px`} />
			<PlayerPaddle isOnLeft={false} top={`${window.player2Y}px`} />
			<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-full border-r-2 border-dashed border-beige" />
			<div className="absolute text-white top-4 left-1/2 transform -translate-x-1/2 gap-x-8 md:gap-x-16 flex">
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
				top={window.ballYPosition}
				left={window.ballXPosition}
			/>
			<div
				className="relative w-full h-full rounded-2xl"
				onMouseMove={movePlayer}
			/>
			<div ref={ref} />
		</div>
	);
};

export default PlayGround;
