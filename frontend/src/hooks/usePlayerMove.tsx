import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { PADDLE_HEIGHT, PADDLE_Y_MARGIN, PLAYER_ONE, PLAYGROUND_BORDERSIZE, PLAY_GROUND_HEIGHT } from "../utils/constants/Game";

const usePlayerMove = (initialY: number, playerIndex: number) => {
	const [playerY, setPlayerY] = useState<number>(initialY);

	const LocalUserData = useSelector((state: any) => state.user.user);

	const clientSocket  = useSelector((state: any) => state.chat.clientSocket);

	const matchData: IMatchState = useSelector((state: any) => state.match);

	useEffect(() => {
		if (playerIndex === PLAYER_ONE) {
			window.player1Y = playerY;
		} else {
			window.player2Y = playerY;
		}
	}, [playerY])

	const movePlayerByMouse = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		let newMouseY = (e.clientY - e.target.getBoundingClientRect().top);

		if (newMouseY + PADDLE_HEIGHT / 2 + PLAYGROUND_BORDERSIZE >= PLAY_GROUND_HEIGHT) {
			newMouseY = PLAY_GROUND_HEIGHT - PLAYGROUND_BORDERSIZE - PADDLE_HEIGHT / 2 - PADDLE_Y_MARGIN;
		} else if (newMouseY - PADDLE_HEIGHT / 2 <= 0) {
			newMouseY = PADDLE_HEIGHT / 2 + PADDLE_Y_MARGIN;
		} else {
			newMouseY = newMouseY;
		}

		setPlayerY(newMouseY);

		clientSocket.emit("updatePlayerY", {
			matchId: matchData.match?.matchId,
			userId: LocalUserData.id,
			newY: newMouseY,
		})

	};

	const updatePlayerY = (newY: number) => {
		setPlayerY(newY);
	}

	// const updatePlayerPosition = (playerIndex: number) => {

	// 	if (playerIndex === PLAYER_ONE) {
	// 		setPlayerY(prevPlayerY => {
	// 			return window.playgroundHeight * window.player1YPositionRatio
	// 		})
	// 	}
	// 	else {
	// 		setPlayerY(prevPlayerY => {
	// 			return window.playgroundHeight * window.player2YPositionRatio
	// 		})
	// 	}
	// };

	

	return {
		playerY,
		movePlayerByMouse,
		updatePlayerY
		// updatePlayerPosition
	};
}

export default usePlayerMove