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
	PLAY_GROUND_HEIGHT,
	PLAY_GROUND_WIDTH,
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
				x: INITIAL_BALL_X,
				y: INITIAL_BALL_Y,
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
			ballXposition <= BALL_SIZE &&
			ballYposition + BALL_SIZE / 2 >=
				playerYposition - PADDLE_HEIGHT / 2 - PADDLE_Y_MARGIN &&
			ballYposition <=
				playerYposition + PADDLE_HEIGHT / 2 + PADDLE_Y_MARGIN
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
			ballXposition + BALL_SIZE / 2 >= PLAY_GROUND_WIDTH - PADDLE_WIDTH &&
			ballYposition + BALL_SIZE / 2 >=
				playerYposition - PADDLE_HEIGHT / 2 - PADDLE_Y_MARGIN &&
			ballYposition <=
				playerYposition + PADDLE_HEIGHT / 2 + PADDLE_Y_MARGIN
		) {
			return true;
		}

		return false;
	};

	const updateBall = (delta: number) => {
		setBallPosition((prev) => {
			const distance = prev.velocity * delta / 2;

			let newDirectionX = prev.directionX;
			let newDirectionY = prev.directionY;

			let newX = prev.x + newDirectionX * distance;
			let newY = prev.y + newDirectionY * distance;

			let newVelocity = prev.velocity + VELOCITY_INCREASE * delta;

			if (
				newY + BALL_SIZE / 2 >=
				PLAY_GROUND_HEIGHT - PLAYGROUND_BORDERSIZE
			) {
				newDirectionY = newDirectionY * -1;
				newY = prev.y + newDirectionY * distance;
			}

			if (newY - BALL_SIZE / 2 <= 0) {
				newDirectionY = newDirectionY * -1;
				newY = prev.y + newDirectionY * distance;
			}

			if (isCollisionWithPlayer1(newX, newY, window.player1Y)) {
				newDirectionX = newDirectionX * -1;
				newX = prev.x + newDirectionX * distance;
			}

			if (isCollisionWithPlayer2(newX, newY, window.player2Y)) {
				newDirectionX = newDirectionX * -1;
				newX = prev.x + newDirectionX * distance;
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

			if (newX + BALL_SIZE / 2 >= PLAY_GROUND_WIDTH - PADDLE_WIDTH) {
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
		// velocity += VELOCITY_INCREASE * delta;
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
