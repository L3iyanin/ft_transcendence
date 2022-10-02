
const Score : React.FC <{score1 : number, score2 : number, isbg : boolean}> = ({ score1, score2, isbg}) => {
	return (
		<div className={`xl:px-8 xl:py-2 py-0 px-2  rounded-3xl bg-grey flex justify-center items-center gap-2 text-xs xl:text-xl font-bold ${isbg && "bg-grey"}`}>
			<span>{score1}</span>
			<span>:</span>
			<span>{score2}</span>
		</div>
		
	);
};

export default Score;
