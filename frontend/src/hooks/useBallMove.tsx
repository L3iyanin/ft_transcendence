import { useEffect, useRef, useState } from "react";
import {
	BALL_SIZE,
	INITIAL_BALL_X,
	INITIAL_BALL_Y,
	INITIAL_VELOCITY,
	PADDLE_HEIGHT,
	PADDLE_X_MARGIN,
	PADDLE_Y_MARGIN,
	PLAY_GROUND_HEIGHT,
	PLAY_GROUND_WIDTH,
	VELOCITY_INCREASE,
} from "../utils/constants/Game";

const useBallMove = (x: number, y: number) => {
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
		while (
			Math.abs(direction.x) <= 0.2 ||
			Math.abs(direction.x) >= 0.9
		) {
			const heading = randomNumberBetween(0, 2 * Math.PI);
			direction = { x: Math.cos(heading), y: Math.sin(heading) };
		}
		setBallPosition(_ => {
			return {
				x: INITIAL_BALL_X,
				y: INITIAL_BALL_Y,
				directionX: direction.x,
				directionY: direction.y,
				velocity: INITIAL_VELOCITY,
			};
		})
	};

	let i: number = 1;
	const isCollision = (ballXposition: number, ballYposition: number, playerYposition: number): boolean => {
		
		// if (ballXposition <= BALL_SIZE && ballXposition > 0) {
		// 	console.log(`ballYposition: ${ballYposition}`);
		// 	console.log(`playerYposition + PADDLE_HEIGHT / 2: ${playerYposition - PADDLE_HEIGHT / 2 - PADDLE_Y_MARGIN}`);
		// }
		if (
			ballXposition <= BALL_SIZE &&
			ballYposition + BALL_SIZE / 2 >= playerYposition - PADDLE_HEIGHT / 2 - PADDLE_Y_MARGIN &&
			ballYposition <= playerYposition + PADDLE_HEIGHT / 2 + PADDLE_Y_MARGIN
		) {
			// console.log(i++);
			return true;
		}
		return false;
	};

	const updateBall = (delta: number) => {
		
		// console.log(window.playerY)
		setBallPosition((prev) => {
			const distance = prev.velocity * delta / 2;

			let newDirectionX = prev.directionX;
			let newDirectionY = prev.directionY;
			
			let newX = prev.x + newDirectionX * distance;
			let newY = prev.y + newDirectionY * distance;


			let newVelocity = prev.velocity + VELOCITY_INCREASE * delta;

			if (newY + BALL_SIZE / 2 >= PLAY_GROUND_HEIGHT) {
				newDirectionY = newDirectionY * -1;
				newY = prev.y + newDirectionY * distance;
			}
			if (newX + BALL_SIZE / 2 >= PLAY_GROUND_WIDTH) {
				newDirectionX = newDirectionX * -1;
				newX = prev.x + newDirectionX * distance;
			}
			if (newY <= BALL_SIZE) {
				newDirectionY = newDirectionY * -1;
				newY = prev.y + newDirectionY * distance;
			}

			
			if (isCollision(newX, newY, window.playerY)) {
				newDirectionX = newDirectionX * -1;
				newX = prev.x + newDirectionX * distance;
			}
			
			if (newX - BALL_SIZE / 2 <= PADDLE_X_MARGIN / 2) {
				resetBall();
				console.log("%c Weeeeee Goaaaaaal..!!!", "color: green; font-size: 20px; font-weight: bold");
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
