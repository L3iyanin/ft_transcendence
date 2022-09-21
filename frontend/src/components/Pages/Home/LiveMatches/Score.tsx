
const Score : React.FC <{score1 : number, score2 : number}> = ({ score1, score2}) => {
	return (
		<p className={"container max-w-fit leading-5 px-4 py-0 rounded-xl tracking-widest text-center font-medium text-sm text-white"}>
			{`${score1} : ${score2}`}
		</p>
	);
};

export default Score;
