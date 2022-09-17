
const PlayerPaddle: React.FC<{
	isOnLeft: boolean;
	top: string;
}> = ({ isOnLeft, top }) => {

	return (
		<div
			className={`absolute rounded-sm bg-beige ${
				isOnLeft ? "left-[12px]" : "right-[12px]"
			}`}
			style={{
				top: top,
				height: `${window.paddleHeight}px`,
				width: `${window.paddleWidth}px`,
				transform: `translateY(-50%)`,
				left: isOnLeft ? `${window.paddleXMargin}px` : "auto",
				right: !isOnLeft ? `${window.paddleXMargin}px` :"auto",
			}}
		/>
	);
};

export default PlayerPaddle;
