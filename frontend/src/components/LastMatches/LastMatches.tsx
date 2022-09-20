import Match from "../Match/Match";

const LastMatches = ({ children }: { children: IGameMatch[] }) => {
	return (
		<section className="container m-2 px-2 min-w-[530px] h-[395px] rounded-lg flex flex-col justify-center items-start gap-4 bg-dark-60 text-white">
			<h2 className="px-4 text-xl font-bold">Last Matches:</h2>
			<section className="container max-h-[320px] px-4 overflow-y-auto">
			{
				children.map((match: IGameMatch) => (
					<Match
						match={match}
						className="border-beige"
						scoreStyle="bg-grey text-white text-sm"
					/>
				))
			}
			</section>
		</section>
	);
};

export default LastMatches;
