import { useState } from "react";

// I made minus 8 to remove the border of playground
const playgroundBorderSize = 8;
const paddleYMargin = 10;

const usePlayerMove = (initialX: number, playGorundHeight: number, paddleHeight: number) => {
	const [playerX, setPlayerX] = useState<number>(initialX);

	const movePlayer = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		if (e.clientY - e.target.offsetTop + (paddleHeight / 2) + playgroundBorderSize >= playGorundHeight) {
			setPlayerX(playGorundHeight - playgroundBorderSize - paddleHeight / 2 - paddleYMargin);
		}
		else if (e.clientY - e.target.offsetTop - paddleHeight / 2 <= 0) {
			setPlayerX(paddleHeight / 2 + paddleYMargin);
		}
		else {
			setPlayerX(e.clientY - e.target.offsetTop);
		}
	};

	const stopPropagation = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		e.stopPropagation();
	};

	const playerMoveOnPaddle = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		e.stopPropagation();
		if (e.clientY - e.target.offsetParent.offsetTop + paddleHeight / 2 + playgroundBorderSize >= playGorundHeight) {
			setPlayerX(playGorundHeight - paddleHeight / 2 - playgroundBorderSize - paddleYMargin);
		}
		else if (e.clientY - e.target.offsetParent.offsetTop - paddleHeight / 2 <= 0) {
			setPlayerX(paddleHeight / 2 + paddleYMargin);
		}
		else {
			setPlayerX(e.clientY - e.target.offsetParent.offsetTop);
		}
	};

	return {
		playerX,
		movePlayer,
		stopPropagation,
		playerMoveOnPaddle,
	};
}

export default usePlayerMove