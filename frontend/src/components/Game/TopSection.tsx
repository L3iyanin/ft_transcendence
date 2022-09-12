
const TopSection: React.FC<{
	name: string;
	goalsToWin: number;
}> = ({ name, goalsToWin }) => {
	return (
		<>
			<h1 className="text-center text-white text-3xl font-bold">
				{name}
			</h1>
			<h2 className="text-center text-beige text-xl mt-2">
				{goalsToWin} Goals to win
			</h2>
		</>
	);
};

export default TopSection;