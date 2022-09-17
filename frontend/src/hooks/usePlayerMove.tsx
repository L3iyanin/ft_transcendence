import { useEffect, useState } from "react";
import { PADDLE_Y_MARGIN, PLAYER_ONE, PLAYGROUND_BORDERSIZE } from "../utils/constants/Game";

const usePlayerMove = (initialY: number, PADDLE_HEIGHT: number, playerIndex: number) => {
	const [playerY, setPlayerY] = useState<number>(initialY);

	useEffect(() => {
		if (playerIndex === PLAYER_ONE) {
			window.player1Y = playerY;
		} else {
			window.player2Y = playerY;
		}
	}, [playerY])

	const movePlayer = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		const newY = e.clientY - e.target.offsetTop - PADDLE_HEIGHT / 2;
		console.log(e.clientY);
		if (newY + (PADDLE_HEIGHT / 2) + PLAYGROUND_BORDERSIZE >= window.playgroundHeight) {
			setPlayerY(window.playgroundHeight - PLAYGROUND_BORDERSIZE - PADDLE_HEIGHT / 2 - PADDLE_Y_MARGIN);
		}
		else if (newY - PADDLE_HEIGHT / 2 <= 0) {
			setPlayerY(PADDLE_HEIGHT / 2 + PADDLE_Y_MARGIN);
		}
		else {
			// setPlayerY(newY);
			setPlayerY(newY);
		}
	};

	return {
		playerY,
		movePlayer,
	};
}

export default usePlayerMove