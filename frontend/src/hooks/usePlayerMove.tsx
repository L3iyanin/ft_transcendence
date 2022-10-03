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

	const movePlayerByMouse = (e: any) => {
		let newMouseY = (e.clientY - e.target.getBoundingClientRect().top);

		if (newMouseY + window.paddleHeight / 2 + PLAYGROUND_BORDERSIZE >= window.playgroundHeight) {
			newMouseY = window.playgroundHeight - PLAYGROUND_BORDERSIZE - window.paddleHeight / 2 - window.paddleYMargin;
		} else if (newMouseY - window.paddleHeight / 2 <= 0) {
			newMouseY = window.paddleHeight / 2 + window.paddleYMargin;
		} else {
			newMouseY = newMouseY;
		}

		
		
		clientSocket.emit("updatePlayerY", {
			matchId: matchData.match?.matchId,
			userId: LocalUserData.id,
			newY: newMouseY * PLAY_GROUND_HEIGHT / window.playgroundHeight,
		})
		
		// if (playerIndex === PLAYER_ONE) {
		// 	window.player1YPositionRatio = newMouseY / window.playgroundHeight;
		// 	newMouseY = window.playgroundHeight * window.player1YPositionRatio
		// }
		// else {
		// 	window.player2YPositionRatio = newMouseY / window.playgroundHeight;
		// 	newMouseY = window.playgroundHeight * window.player2YPositionRatio
		// }

		setPlayerY(newMouseY);

	};

	const updatePlayerY = (newY: number) => {
		setPlayerY(newY);
	}

	const updatePlayerPositionOutside = (playerIndex: number) => {

		if (playerIndex === PLAYER_ONE) {
			setPlayerY(prevPlayerY => {
				return window.playgroundHeight * window.player1YPositionRatio
			})
		}
		else {
			setPlayerY(prevPlayerY => {
				return window.playgroundHeight * window.player2YPositionRatio
			})
		}
	};
	

	return {
		playerY,
		movePlayerByMouse,
		updatePlayerY,
		updatePlayerPositionOutside,
	};
}

export default usePlayerMove