import { useEffect, useState } from "react";
import { PADDLE_Y_MARGIN, PLAYGROUND_BORDERSIZE } from "../utils/constants/Game";

const usePlayerMove = (initialY: number, PLAY_GROUND_HEIGHT: number, PADDLE_HEIGHT: number) => {
	const [playerY, setPlayerY] = useState<number>(initialY);

	useEffect(() => {
		window.playerY = playerY;
	}, [playerY])

	const movePlayer = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		if (e.clientY - e.target.offsetTop + (PADDLE_HEIGHT / 2) + PLAYGROUND_BORDERSIZE >= PLAY_GROUND_HEIGHT) {
			setPlayerY(PLAY_GROUND_HEIGHT - PLAYGROUND_BORDERSIZE - PADDLE_HEIGHT / 2 - PADDLE_Y_MARGIN);
			// window.playerY = PLAY_GROUND_HEIGHT - PLAYGROUND_BORDERSIZE - PADDLE_HEIGHT / 2 - PADDLE_Y_MARGIN;
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
		if (e.clientY - e.target.offsetParent.offsetTop + PADDLE_HEIGHT / 2 + PLAYGROUND_BORDERSIZE >= PLAY_GROUND_HEIGHT) {
			setPlayerY(PLAY_GROUND_HEIGHT - PADDLE_HEIGHT / 2 - PLAYGROUND_BORDERSIZE - PADDLE_Y_MARGIN);
			window.playerY = PLAY_GROUND_HEIGHT - PADDLE_HEIGHT / 2 - PLAYGROUND_BORDERSIZE - PADDLE_Y_MARGIN;
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