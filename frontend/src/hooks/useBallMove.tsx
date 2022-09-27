import { useEffect, useRef, useState } from "react";
import { CollisionTypeEnum } from "../utils/constants/enum";
import {
	BALL_SIZE,
	INITIAL_BALL_X,
	INITIAL_BALL_Y,
	INITIAL_VELOCITY,
	PLAYER_ONE,
	PLAYER_TWO,
	PLAYGROUND_BORDERSIZE,
	PLAY_GROUND_HEIGHT,
	PLAY_GROUND_WIDTH,
	VELOCITY_INCREASE,
} from "../utils/constants/Game";

const useBallMove = () => {

	const [ballPosition, setBallPosition] = useState<{ x: number; y: number; }>({ x: 0, y: 0 });

	const updateBall = (ballX: number, ballY: number) => {

		// window.ballYPosition = ballY / PLAY_GROUND_HEIGHT * window.playgroundHeight;
		// window.ballXPosition = ballX / PLAY_GROUND_WIDTH * window.playgroundWidth;


		window.ballYPosition = ballY;
		window.ballXPosition = ballX;

		// console.log(`ballY: ${ballY}, ballX: ${ballX}`);

		// console.log(`window.playgroundHeight: ${window.playgroundHeight}`);
		// console.log(`window.playgroundWidth: ${window.playgroundWidth}`);

		// console.log(`window.ballYPosition: ${window.ballYPosition}`);
		// console.log(`window.ballXPosition: ${window.ballXPosition}`);


		// window.ballXPositionRatio = window.ballXPosition / window.playgroundWidth;
		// window.ballYPositionRatio = window.ballYPosition / window.playgroundHeight;

		// const newX = window.playgroundWidth * window.ballXPositionRatio;
		// const newY = window.playgroundHeight * window.ballYPositionRatio;
		
		// window.ballXPosition = newX;
		// window.ballYPosition = newY;

		// setBallPosition({ x: newX, y: newY });

	}

	const updateBallOutside = () => {
		setBallPosition((prev) => {
			// console.log(`prev.y: ${prev.y}`);
			// console.log(`window.ballXPositionRatio: ${window.ballXPositionRatio}`);
			const newX = window.playgroundWidth * window.ballXPositionRatio;
			const newY = window.playgroundHeight * window.ballYPositionRatio;

			window.ballXPosition = newX;
			window.ballYPosition = newY;
			
			return {
				x: newX,
				y: newY,
			};
		});
	}

	return {
		ballPosition,
		updateBall,
		updateBallOutside
	};
};

export default useBallMove;
