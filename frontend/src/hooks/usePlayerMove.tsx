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

	const movePlayer = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		const newY = (e.clientY - e.target.getBoundingClientRect().top);
		
		if (newY + (window.paddleHeight / 2) + PLAYGROUND_BORDERSIZE >= window.playgroundHeight) {
			setPlayerY((window.playgroundHeight - PLAYGROUND_BORDERSIZE - window.paddleHeight / 2 - window.paddleYMargin));
		}
		else if (newY - window.paddleHeight / 2 <= 0) {

			setPlayerY((window.paddleHeight / 2 + window.paddleYMargin));
		}
		else {
			setPlayerY(newY);
		}
	};

	const updatePlayerPosition = (playerIndex: number) => {

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
		movePlayer,
		updatePlayerPosition
	};
}

export default usePlayerMove