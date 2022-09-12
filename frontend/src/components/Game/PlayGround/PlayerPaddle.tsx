const PlayerPaddle: React.FC<{
	isOnLeft: boolean;
	top: string;
	paddleHeight: number;
	playerMoveOnPaddle: any;
}> = ({ isOnLeft, top, paddleHeight, playerMoveOnPaddle }) => {
	
	return (
		<div
			onMouseMove={playerMoveOnPaddle}
			// onMouseDown={playerMoveOnPaddle}
			// onMouseOver={onMouseDown}
			// onMouseOut={playerMoveOnPaddle}
			className={`absolute rounded-sm w-[20px] bg-beige ${
				isOnLeft ? "left-[12px]" : "right-[12px]"
			}`}
			style={{
				top: top,
				height: `${paddleHeight}px`,
				transform: `translateY(-50%)`,
			}}
		/>
	);
};

export default PlayerPaddle;
