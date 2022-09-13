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
		if (e.clientY - e.target.offsetTop + (PADDLE_HEIGHT / 2) + PLAYGROUND_BORDERSIZE >= window.playgroundHeight) {
			setPlayerY(window.playgroundHeight - PLAYGROUND_BORDERSIZE - PADDLE_HEIGHT / 2 - PADDLE_Y_MARGIN);
			// window.playerY = window.playgroundHeight - PLAYGROUND_BORDERSIZE - PADDLE_HEIGHT / 2 - PADDLE_Y_MARGIN;
		}
		else if (e.clientY - e.target.offsetTop - PADDLE_HEIGHT / 2 <= 0) {
			setPlayerY(PADDLE_HEIGHT / 2 + PADDLE_Y_MARGIN);
			// window.playerY = PADDLE_HEIGHT / 2 + PADDLE_Y_MARGIN;
		}
		else {
			setPlayerY(e.clientY - e.target.offsetTop);
			// window.playerY = e.clientY - e.target.offsetTop;
		}
	};

	const stopPropagation = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		e.stopPropagation();
	};

	const playerMoveOnPaddle = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		e.stopPropagation();
		if (e.clientY - e.target.offsetParent.offsetTop + PADDLE_HEIGHT / 2 + PLAYGROUND_BORDERSIZE >= window.playgroundHeight) {
			setPlayerY(window.playgroundHeight - PADDLE_HEIGHT / 2 - PLAYGROUND_BORDERSIZE - PADDLE_Y_MARGIN);
			window.playerY = window.playgroundHeight - PADDLE_HEIGHT / 2 - PLAYGROUND_BORDERSIZE - PADDLE_Y_MARGIN;
		}
		else if (e.clientY - e.target.offsetParent.offsetTop - PADDLE_HEIGHT / 2 <= 0) {
			setPlayerY(PADDLE_HEIGHT / 2 + PADDLE_Y_MARGIN);
			window.playerY = PADDLE_HEIGHT / 2 + PADDLE_Y_MARGIN;
		}
		else {
			setPlayerY(e.clientY - e.target.offsetParent.offsetTop);
			window.playerY = e.clientY - e.target.offsetParent.offsetTop;
		}
	};

	return {
		playerY,
		movePlayer,
		stopPropagation,
		playerMoveOnPaddle,
	};
}

export default usePlayerMove