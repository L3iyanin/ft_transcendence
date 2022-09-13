import { IScoreProps } from "../../utils/types/Game";

const Score = ({ score1, score2, className }: IScoreProps) => {
	return (
		<p className={"block w-40 rounded-xl px-3 tracking-widest text-center font-medium " + className}>
			{score1 + " : " + score2}
		</p>
	);
};

export default Score;
