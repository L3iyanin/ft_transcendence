import { useEffect, useRef, useState } from "react";
import {
	BALL_SIZE,
	INITIAL_BALL_START_POSITION,
} from "../../../../utils/constants/Game";

const Ball: React.FC<{
	top: number;
	left: number;
}> = ({ top, left }) => {
	
	return (
		<div
			className={`absolute bg-beige rounded-full`}
			style={{
				top: `${top - BALL_SIZE / 2}px`,
				left: `${left - BALL_SIZE / 2}px`,
				width: `${BALL_SIZE}px`,
				height: `${BALL_SIZE}px`,
			}}
		/>
	);
};

export default Ball;
