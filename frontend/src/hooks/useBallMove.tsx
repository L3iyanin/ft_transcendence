import { useEffect, useRef, useState } from "react";
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
	VELOCITY_INCREASE,
} from "../utils/constants/Game";

const useBallMove = (setPlayersScoreHandler: (playerIndex: number, goalsOnPlayer: number) => void) => {
	let lastTime: DOMHighResTimeStamp | null = null;
	// let direction: { x: number; y: number };

	const [ballPosition, setBallPosition] = useState<{
		x: number;
		y: number;
		velocity: number;
		directionX: number;
		directionY: number;
	}>({
		x: INITIAL_BALL_X,
		y: INITIAL_BALL_Y,
		velocity: INITIAL_VELOCITY,
		directionX: 0.5,
		directionY: 0.5,
	});

	const requestRef = useRef<null | number>(null);

	const resetBall = () => {
		let direction = { x: 0, y: 0 };
		
		while (Math.abs(direction.x) <= 0.2 || Math.abs(direction.x) >= 0.9) {
			const heading = randomNumberBetween(0, 2 * Math.PI);
			direction = { x: Math.cos(heading), y: Math.sin(heading) };
		}

		setBallPosition((_) => {
			return {
				x: window.playgroundWidth / 2 - BALL_SIZE / 2 + PLAYGROUND_BORDERSIZE + 2,
				y: window.playgroundHeight / 2 - BALL_SIZE / 2 + PLAYGROUND_BORDERSIZE + 2,
				directionX: direction.x,
				directionY: direction.y,
				velocity: INITIAL_VELOCITY,
			};
		});
	};

	const isCollisionWithPlayer1 = (
		ballXposition: number,
		ballYposition: number,
		playerYposition: number
	): boolean => {
		if (
			ballXposition - BALL_SIZE / 2 <= BALL_SIZE &&
			ballYposition  >=
				playerYposition - PADDLE_HEIGHT / 2 - BALL_SIZE / 2 &&
			ballYposition <=
				playerYposition + PADDLE_HEIGHT / 2 + BALL_SIZE / 2
		) {
			return true;
		}
		return false;
	};

	const isCollisionWithPlayer2 = (
		ballXposition: number,
		ballYposition: number,
		playerYposition: number
	): boolean => {
		if (
			ballXposition + BALL_SIZE >= window.playgroundWidth - PADDLE_WIDTH  &&
			ballYposition + BALL_SIZE / 2 >=
				playerYposition - PADDLE_HEIGHT / 2 - BALL_SIZE / 2 &&
			ballYposition <=
				playerYposition + PADDLE_HEIGHT / 2 + BALL_SIZE / 2
		) {
			return true;
		}

		return false;
	};

	const updateBall = (delta: number) => {
		setBallPosition((prev) => {
			// const distance = prev.velocity * delta / 2;
			const distance = 1;

			let newDirectionX = prev.directionX;
			let newDirectionY = prev.directionY;

			if (window.widthRatio != 1) {
				console.log(window.widthRatio);
			}

			let newX = prev.x + newDirectionX * distance * window.widthRatio;
			let newY = prev.y + newDirectionY * distance * window.heightRatio;

			let newVelocity = prev.velocity + VELOCITY_INCREASE * delta;

			if (newY + BALL_SIZE / 2 >= window.playgroundHeight - PLAYGROUND_BORDERSIZE)
			{
				newDirectionY = newDirectionY * -1;
				newY = prev.y + newDirectionY * distance * window.heightRatio;
			}

			if (newY - BALL_SIZE / 2 <= 0) {
				newDirectionY = newDirectionY * -1;
				newY = prev.y + newDirectionY * distance * window.heightRatio;
			}

			if (isCollisionWithPlayer1(newX, newY, window.player1Y)) {
				newDirectionX = newDirectionX * -1;
				newX = prev.x + newDirectionX * distance * window.widthRatio;
			}

			if (isCollisionWithPlayer2(newX, newY, window.player2Y)) {
				newDirectionX = newDirectionX * -1;
				newX = prev.x + newDirectionX * distance * window.widthRatio;
			}

			if (
				newX - BALL_SIZE / 2 <=
				PADDLE_X_MARGIN + PLAYGROUND_BORDERSIZE - PLAYGROUND_BORDERSIZE
			) {
				resetBall();
				setPlayersScoreHandler(PLAYER_TWO, 1);
				console.log(
					"%c Goaaal on You..!!!",
					"color: red; font-size: 20px; font-weight: bold"
				);
			}

			if (newX + BALL_SIZE / 2 >= window.playgroundWidth - PADDLE_WIDTH) {
				resetBall();
				setPlayersScoreHandler(PLAYER_ONE, 1);
				console.log(
					"%c Weeeeee Goaaaaaal..!!!",
					"color: green; font-size: 20px; font-weight: bold"
				);
			}

			return {
				x: newX,
				y: newY,
				velocity: newVelocity,
				directionX: newDirectionX,
				directionY: newDirectionY,
			};
		});
	};

	const animate = (time: DOMHighResTimeStamp) => {
		if (lastTime != null) {
			const deltaTime = time - lastTime;
			updateBall(deltaTime);
		}

		lastTime = time;
		requestRef.current = requestAnimationFrame(animate);
	};

	useEffect(() => {
		resetBall();
		requestRef.current = requestAnimationFrame(animate);
		return () => cancelAnimationFrame(requestRef.current!);
	}, []);

	return {
		ballPosition,
	};
};

export default useBallMove;

function randomNumberBetween(min: number, max: number) {
	return Math.random() * (max - min) + min;
}
