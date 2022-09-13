import Match from "../Match/Match";

const LastMatches = ({ children }: { children: IGameMatch[] }) => {
	return (
		<section className="container min-w-[530px] max-w-[560px] p-4 rounded-lg flex flex-col justify-center items-start gap-2 bg-dark-60 text-white">
			<h2 className="text-xl font-bold">Last Matches:</h2>
			{
				children.map((match: IGameMatch) => (
					<Match
						className="border-beige"
						scoreStyle="bg-grey text-white text-sm"
					>
						{match}
					</Match>
				))
			}
		</section>
	);
};

export default LastMatches;
