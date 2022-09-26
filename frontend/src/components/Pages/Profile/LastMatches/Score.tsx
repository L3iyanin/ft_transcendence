
const Score : React.FC <{score1 : number, score2 : number}> = ({ score1, score2}) => {
	return (
		<p className={"bg-grey w-full max-w-fit leading-5 px-8 py-2 rounded-full tracking-widest text-center text-xl font-bold text-white"}>
			{score1 + " : " + score2}
		</p>
	);
};

export default Score;
