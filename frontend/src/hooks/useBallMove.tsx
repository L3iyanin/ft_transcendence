import { useEffect, useRef, useState } from "react";

const useBallMove = ({ x, y }: { x: number; y: number }) => {
	const [ballPosition, setBallPosition] = useState<{
		x: number;
		y: number;
	}>({
		x: x,
		y: y,
	});

	const requestRef = useRef<null>();

	const animate = (time: any) => {
		setBallPosition((prev) => {
			return {
				x: prev.x + 1,
				y: prev.y + 1,
			};
		});
		requestRef.current = requestAnimationFrame(animate);
	};

	useEffect(() => {
		requestRef.current = requestAnimationFrame(animate);
		return () => cancelAnimationFrame(requestRef.current!);
	}, []);

	return {
		ballPosition,
	};
};

export default useBallMove;
