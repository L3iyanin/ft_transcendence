import Match from "../Match/Match";

const LastMatches = ({ children }: { children: IGameMatch[] }) => {
	return (
		<section className="container flex flex-col gap-1 bg-dark-100">
			{
				children.map((match: IGameMatch) => (
				<Match
					className="w-3/5 border-beige"
					scoreStyle="bg-grey text-white text-sm"
				>
					{match}
				</Match>
			))}
		</section>
	);
};

export default LastMatches;
