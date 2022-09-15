import Achievement from "./Achievement";

const AchievementsList = ({achievements} : IAchievementsListProps) => {
	return (
		<section className="container w-5/12 py-3 px-3 rounded-lg flex flex-col justify-center gap-4 bg-dark-60">
		{
			achievements.map((achievement : IAchievement) => 
				<Achievement achievement={achievement} />)
		}
		</section>
	);
}

export default AchievementsList;