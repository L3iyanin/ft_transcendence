import { IScoreProps } from "../../utils/types/Game";

const Score = ({ score1, score2, className }: IScoreProps) => {
	return (
		<p className={"container max-w-fit leading-5 px-4 py-0 rounded-xl tracking-widest text-center font-medium text-sm " + className}>
			{score1 + " : " + score2}
		</p>
	);
};

export default Score;
