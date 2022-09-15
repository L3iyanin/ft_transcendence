import { matches } from "../utils/data/Match";
import { players } from "../utils/data/Players";
import Match from "../components/Match/Match";
import NavBar from "../components/NavBar/NavBar";
import LastMatches from "../components/LastMatches/LastMatches";
import UserCard from "../components/UserCard/UserCard";
import { achievements } from "../utils/data/Achievements";
import AchievementsList from "../components/pages/Profile/AchievementsList";

const Profile = () => {
	return (
		<div>
			<NavBar />
			<main className="container flex flex-col gap-10">
				<section className="container flex justify-between items-center gap-8">
					<UserCard>{players[0]}</UserCard>
					<LastMatches>{matches}</LastMatches>
				</section>
				<section className="container flex justify-between items-center gap-8">
					<AchievementsList achievements={achievements} />
				</section>
			</main>
		</div>
	);
};

export default Profile;
