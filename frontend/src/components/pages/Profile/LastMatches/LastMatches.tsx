import Match from "./Match";

const LastMatches : React.FC < {matches : IGameMatch[]} > = ({ matches}) => {
	return (
		<section className="container m-2 px-2 min-w-[530px] h-[395px] rounded-lg flex flex-col justify-center items-start gap-4 bg-dark-60 text-white">
			<h2 className="px-4 text-xl font-bold">Last Matches:</h2>
			<section className="container max-h-[320px] px-4 overflow-y-auto">
				{matches.map((match: IGameMatch, index: number) => (
					<Match key={index} match={match} />
				))}
			</section>
		</section>
	);
};

export default LastMatches;
