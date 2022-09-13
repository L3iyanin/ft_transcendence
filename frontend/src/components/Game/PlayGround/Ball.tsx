
const Ball: React.FC<{
	top: string;
	left: string;
}> = ({ top, left }) => {
	return (
		<div className={`absolute w-[28px] h-[28px] bg-beige rounded-full`} style={{
			top: top,
			left: left,
		}} />
	);
}

export default Ball