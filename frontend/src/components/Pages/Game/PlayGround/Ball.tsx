import { BALL_SIZE } from "../../../../utils/constants/Game";

const Ball: React.FC<{
	top: number;
	left: number;
}> = ({ top, left }) => {
	
	// console.log("========== Ball ==========");
	// console.log(top, left);
	// console.log("================================");

	return (
		<div
			className={`absolute bg-beige rounded-full`}
			style={{
				top: `${window.ballYPosition - window.ballSize / 2}px`,
				left: `${window.ballXPosition - window.ballSize / 2}px`,
				width: `${window.ballSize}px`,
				height: `${window.ballSize}px`,
				// top: `${top - BALL_SIZE / 2}px`,
				// left: `${left - BALL_SIZE / 2}px`,
				// width: `${BALL_SIZE}px`,
				// height: `${BALL_SIZE}px`,
			}}
		/>
	);
};

export default Ball;
