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
	VELOCITY_INCREASE,
} from "../utils/constants/Game";

const useBallMove = () => {

	// const [ballPosition, setBallPosition] = useState<{ x: number; y: number; }>({ x: 0, y: 0 });

	const updateBall = (ballX: number, ballY: number) => {
		window.ballYPosition = ballY;
		window.ballXPosition = ballX;
		// setBallPosition({ x: ballX, y: ballY });
	}

	return {
		// ballPosition,
		updateBall,
	};
};

export default useBallMove;
