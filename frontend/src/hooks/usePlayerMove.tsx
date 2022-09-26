import { useEffect, useState } from "react";
import { PLAYER_ONE, PLAYGROUND_BORDERSIZE } from "../utils/constants/Game";

const usePlayerMove = (initialY: number, playerIndex: number) => {
	const [playerY, setPlayerY] = useState<number>(initialY);

	useEffect(() => {
		if (playerIndex === PLAYER_ONE) {
			window.player1Y = playerY;
		} else {
			window.player2Y = playerY;
		}
	}, [playerY])

	const movePlayerByMouse = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		const mouseY = (e.clientY - e.target.getBoundingClientRect().top);

		setPlayerY(mouseY);

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