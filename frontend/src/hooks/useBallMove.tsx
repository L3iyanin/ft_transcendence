import { useEffect, useRef, useState } from "react";
import {
	INITIAL_BALL_X,
	INITIAL_BALL_Y,
	INITIAL_VELOCITY,
	PLAYER_ONE,
	PLAYER_TWO,
	PLAYGROUND_BORDERSIZE,
	VELOCITY_INCREASE,
} from "../utils/constants/Game";

const useBallMove = (
	setPlayersScoreHandler: (playerIndex: number, goalsOnPlayer: number) => void
) => {
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

			window.ballXPoistion = window.playgroundWidth / 2 -
					window.ballSize / 2 +
					PLAYGROUND_BORDERSIZE +
					window.paddleXMargin / 2 - 2;

			window.ballYPoistion = window.playgroundHeight / 2 -
					window.ballSize / 2 +
					PLAYGROUND_BORDERSIZE +
					window.paddleYMargin / 2 - 2;

			return {
				x: window.ballXPoistion,
				y: window.ballYPoistion,
				directionX: direction.x,
				directionY: direction.y,
				// directionX: -1,
				// directionY: 0,
				velocity: INITIAL_VELOCITY,
			};
		});
	};

	const isCollisionWithPlayer = (ballXposition: number, ballYposition: number, playerYposition: number, playerNumber: number): boolean =>
	{
		const cornerX = playerNumber === PLAYER_ONE ? window.paddleXMargin + window.paddleWidth - PLAYGROUND_BORDERSIZE / 2 : window.playgroundWidth - window.paddleXMargin - window.paddleWidth  - PLAYGROUND_BORDERSIZE / 2;

		const radius = window.ballSize / 2;
		const distX = (cornerX - ballXposition) * (cornerX - ballXposition);
		const topCornerY = playerYposition - window.paddleHeight / 2;
		const bottomCornerY = playerYposition + window.paddleHeight / 2;

		if (distX + (topCornerY - ballYposition) * (topCornerY - ballYposition) <= radius * radius)
		{
			return true;
		}
		else if (distX + (bottomCornerY - ballYposition) * (bottomCornerY - ballYposition) <= radius * radius)
		{
			return true;
		}
		else
		{
			const isInPaddleRange = ballYposition >= topCornerY && ballYposition <= bottomCornerY;
			if (playerNumber === 1 && ballXposition - radius <= cornerX && isInPaddleRange)
				return true;
			else if (playerNumber === 2 && ballXposition + radius >= cornerX && isInPaddleRange)
				return true;
			else
				return false;
		}
	};

	const updateBall = (delta: number) => {
		setBallPosition((prev) => {
			// const distance = prev.velocity * delta / 2;
			const distance = 5;

			let newDirectionX = prev.directionX;
			let newDirectionY = prev.directionY;

			let newX = window.ballXPoistion + newDirectionX * distance;
			let newY = window.ballYPoistion + newDirectionY * distance;

			let newVelocity = prev.velocity + VELOCITY_INCREASE * delta;

			if (
				newY + window.ballSize / 2 >=
				window.playgroundHeight - PLAYGROUND_BORDERSIZE
			) {
				newDirectionY = newDirectionY * -1;
				newY = window.ballYPoistion + newDirectionY * distance;
			}

			if (newY - window.ballSize / 2 <= 0) {
				newDirectionY = newDirectionY * -1;
				newY = window.ballYPoistion + newDirectionY * distance;
			}

			if (isCollisionWithPlayer(newX, newY, window.player1Y, PLAYER_ONE)) {
				// cancelAnimationFrame(requestRef.current!)
				newDirectionX = newDirectionX * -1;
				newX = window.ballXPoistion + newDirectionX * distance;
			}

			if (isCollisionWithPlayer(newX, newY, window.player2Y, PLAYER_TWO)) {
				// cancelAnimationFrame(requestRef.current!)
				newDirectionX = newDirectionX * -1;
				newX = window.ballXPoistion + newDirectionX * distance;
			}

			if (
				newX - window.ballSize / 2 <=
				window.paddleXMargin + PLAYGROUND_BORDERSIZE - PLAYGROUND_BORDERSIZE
			) {
				resetBall();
				setPlayersScoreHandler(PLAYER_TWO, 1);
				console.log(
					"%c Goaaal on You..!!!",
					"color: red; font-size: 20px; font-weight: bold"
				);
			}

			if (newX + window.ballSize / 2 >= window.playgroundWidth - window.paddleWidth) {
				resetBall();
				setPlayersScoreHandler(PLAYER_ONE, 1);
				console.log(
					"%c Weeeeee Goaaaaaal..!!!",
					"color: green; font-size: 20px; font-weight: bold"
				);
			}

			window.ballXPoistion = newX;
			window.ballYPoistion = newY;

			return {
				x: newX,
				y: newY,
				velocity: newVelocity,
				directionX: newDirectionX,
				directionY: newDirectionY,
			};
		});
	};

	const updateBallOutside = () => {
		setBallPosition((prev) => {
			console.log(`prev.y: ${prev.y}`);
			console.log(`window.ballXPositionRatio: ${window.ballXPositionRatio}`);
			const newX = window.playgroundWidth * window.ballXPositionRatio;
			const newY = window.playgroundHeight * window.ballYPositionRatio;
			console.log(`newX: ${newX}`);
			window.ballXPoistion = newX;
			window.ballYPoistion = newY;
			console.log(`window.ballXPoistion: ${window.ballXPoistion}`);
			// window.ballYPoistion = newY;
			
			return {
				...prev,
				x: newX,
				y: newY,
			};
		});
	}

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
		updateBallOutside,
		setBallPosition
	};
};

export default useBallMove;

function randomNumberBetween(min: number, max: number) {
	return Math.random() * (max - min) + min;
}
