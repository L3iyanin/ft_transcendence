import { PADDLE_HEIGHT, PADDLE_WIDTH, PADDLE_X_MARGIN } from "../../../../utils/constants/Game";

const PlayerPaddle: React.FC<{
	isOnLeft: boolean;
	top: string;
}> = ({ isOnLeft, top }) => {

	return (
		<div
			className={`absolute rounded-sm bg-beige`}
			style={{
				top: top,
				height: `${window.paddleHeight}px`,
				width: `${window.paddleWidth}px`,
				transform: `translateY(-50%)`,
				left: isOnLeft ? `${window.paddleXMargin}px` : "auto",
				right: !isOnLeft ? `${window.paddleXMargin}px` :"auto",
			}}
			// style={{
			// 	top: top,
			// 	height: `${PADDLE_HEIGHT}px`,
			// 	width: `${PADDLE_WIDTH}px`,
			// 	transform: `translateY(-50%)`,
			// 	left: isOnLeft ? `${PADDLE_X_MARGIN}px` : "auto",
			// 	right: !isOnLeft ? `${PADDLE_X_MARGIN}px` :"auto",
			// }}
		/>
	);
};

export default PlayerPaddle;
