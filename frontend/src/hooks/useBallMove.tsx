import { useEffect, useRef, useState } from "react";
import { CollisionTypeEnum } from "../utils/constants/enum";
import {
	BALL_SIZE,
	INITIAL_BALL_X,
	INITIAL_BALL_Y,
	INITIAL_VELOCITY,
	PADDLE_HEIGHT,
	PADDLE_WIDTH,
	PADDLE_X_MARGIN,
	PADDLE_Y_MARGIN,
	PLAYER_ONE,
	PLAYER_TWO,
	PLAYGROUND_BORDERSIZE,
	PLAY_GROUND_HEIGHT,
	PLAY_GROUND_WIDTH,
	VELOCITY_INCREASE,
} from "../utils/constants/Game";

const useBallMove = () => {

	const updateBall = (ballX: number, ballY: number) => {
		window.ballYPosition = ballY;
		window.ballXPosition = ballX;


		window.ballXPosition = (ballX / PLAY_GROUND_WIDTH) * window.playgroundWidth;
		window.ballYPosition = (ballY / PLAY_GROUND_HEIGHT) * window.playgroundHeight;

		window.ballXPositionRatio = window.ballXPosition / window.playgroundWidth;
		window.ballYPositionRatio = window.ballYPosition / window.playgroundHeight;

		window.paddleHeight = PADDLE_HEIGHT * window.heightRatio;
		window.paddleWidth = PADDLE_WIDTH * window.widthRatio;

		window.paddleXMargin = PADDLE_X_MARGIN * window.widthRatio;
		window.paddleYMargin = PADDLE_Y_MARGIN * window.heightRatio;

		window.ballSize = BALL_SIZE * window.widthRatio;

		window.player1YPositionRatio = window.player1Y / window.playgroundHeight;
		window.player2YPositionRatio = window.player2Y / window.playgroundHeight;
	}


	return {
		updateBall,
	};
};

export default useBallMove;
