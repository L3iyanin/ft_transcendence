declare module "*.svg" {
	const content: any;
	export default content;
}

export declare global {
	interface Window {
		player1Y: number;
		player2Y: number;
		playgroundHeight: number;
		playgroundWidth: number;
		widthRatio: number;
		heightRatio: number;
		paddleHeight: number;
		paddleWidth: number;
		paddleXMargin: number;
		paddleYMargin: number;
		ballSize: number;
		player1YPositionRatio: number;
		player2YPositionRatio: number;
		ballXPoistion: number;
		ballYPoistion: number;
		ballXPositionRatio: number;
		ballYPositionRatio: number;
	}
}