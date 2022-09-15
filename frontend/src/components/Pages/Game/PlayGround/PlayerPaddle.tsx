import { PADDLE_WIDTH, PADDLE_X_MARGIN } from "../../../../utils/constants/Game";

const PlayerPaddle: React.FC<{
	isOnLeft: boolean;
	top: string;
	PADDLE_HEIGHT: number;
	playerMoveOnPaddle: any;
}> = ({ isOnLeft, top, PADDLE_HEIGHT, playerMoveOnPaddle }) => {
	

	return (
		<div
			onMouseMove={playerMoveOnPaddle}
			className={`absolute rounded-sm bg-beige ${
				isOnLeft ? "left-[12px]" : "right-[12px]"
			}`}
			style={{
				top: top,
				height: `${PADDLE_HEIGHT}px`,
				width: `${PADDLE_WIDTH}px`,
				transform: `translateY(-50%)`,
				left: isOnLeft ? `${PADDLE_X_MARGIN}px` : "auto",
				right: !isOnLeft ? `${PADDLE_X_MARGIN}px` :"auto",
			}}
		/>
	);
};

export default PlayerPaddle;
