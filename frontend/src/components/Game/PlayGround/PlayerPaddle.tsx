const PlayerPaddle: React.FC<{
	isOnLeft: boolean;
	top: string;
}> = ({ isOnLeft, top }) => {
	return (
		<div className={`absolute rounded-sm w-[20px] h-[25%] bg-beige ${ isOnLeft ? "left-[12px]" : "right-[12px]"}`} style={{
			top: top,
		}} />
	);
};

export default PlayerPaddle;
