import { INITIAL_BALL_START_POSITION } from "../../../utils/constants/Game";

const Ball: React.FC<{
	top: number;
	left: number;
	onMouseMove: any;
}> = ({ top, left, onMouseMove }) => {

	if (top === INITIAL_BALL_START_POSITION.y && left === INITIAL_BALL_START_POSITION.x) {
		return (<div onMouseMove={onMouseMove} className={`absolute w-[28px] h-[28px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-beige rounded-full`} />)
	}

	return (
		<div onMouseMove={onMouseMove} className={`absolute w-[28px] h-[28px] bg-beige rounded-full`} style={{
			top: `${top}px`,
			left: `${left}px`,
		}} />
	);
}

export default Ball