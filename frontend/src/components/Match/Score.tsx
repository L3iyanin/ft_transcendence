const Score = ({ score1, score2, className}: { score1: number, score2: number, className: string }) => {
	return (
		// <div className={"flex w-40 rounded-xl justify-center text-center font-medium text-white " + className}>
		<div className={"flex w-40 rounded-xl justify-center text-center font-medium text-white tracking-widest " + className}>
			<p className="block text-center px-3">
				{score1 + " : " + score2}
			</p>
		</div>
	);
}

export default Score;