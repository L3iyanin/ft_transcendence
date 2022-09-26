
const Ball: React.FC<{
	top: number;
	left: number;
}> = ({ top, left }) => {
	
	return (
		<div
			className={`absolute bg-beige rounded-full`}
			style={{
				top: `${top - window.ballSize / 2}px`,
				left: `${left - window.ballSize / 2}px`,
				width: `${window.ballSize}px`,
				height: `${window.ballSize}px`,
			}}
		/>
	);
};

export default Ball;
