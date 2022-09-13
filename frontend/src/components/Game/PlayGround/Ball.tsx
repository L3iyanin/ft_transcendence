import { useEffect, useRef, useState } from "react";
import {
	BALL_SIZE,
	INITIAL_BALL_START_POSITION,
} from "../../../utils/constants/Game";

const Ball: React.FC<{
	top: number;
	left: number;
	onMouseMove: any;
}> = ({ top, left, onMouseMove }) => {
	if (
		top === INITIAL_BALL_START_POSITION.y &&
		left === INITIAL_BALL_START_POSITION.x
	) {
		return (
			<div
				onMouseMove={onMouseMove}
				className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-beige rounded-full`}
				style={{
					width: `${BALL_SIZE}px`,
					height: `${BALL_SIZE}px`,
				}}
			/>
		);
	}

	return (
		<div
			onMouseMove={onMouseMove}
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
