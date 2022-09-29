import { BALL_SIZE } from "../../../../utils/constants/Game";

const Ball: React.FC<{
	top: number;
	left: number;
}> = ({ top, left }) => {

	return (
		<div
			className={`absolute bg-white rounded-full`}
			style={{
				top: `${window.ballYPosition - window.ballSize / 2}px`,
				left: `${window.ballXPosition - window.ballSize / 2}px`,
				width: `${window.ballSize}px`,
				height: `${window.ballSize}px`,
			}}
		/>
	);
};

export default Ball;
