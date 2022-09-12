import { useState } from "react";

const useBallMove = ({x , y}: {x: number, y: number}) => {
	const [ballPosition, setBallPosition] = useState<{
		x: number;
		y: number;
	}>({
		x: x,
		y: y,
	});

	return {
		ballPosition,
	}
};

export default useBallMove;
