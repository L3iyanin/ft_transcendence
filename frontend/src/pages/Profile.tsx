import { matches } from "../utils/data/Match";
import { players } from "../utils/data/Players";
import { achievements } from "../utils/data/Achievements";

import NavBar from "../components/NavBar/NavBar";
import UserCard from "../components/pages/Profile/UserCard/UserCard";
import LastMatches from "../components/pages/Profile/LastMatches/LastMatches";

import FirendsList from "../components/pages/Profile/FriendsList/FriendsList";
import AchievementsList from "../components/pages/Profile/AchievementsList/AchievementsList";
import Footer from "../components/Footer/Footer";

const Profile = () => {
	return (
		<>
			<NavBar />
			<main className="container flex flex-col justify-between items-center gap-16">
				<section className="container flex justify-between items-center gap-14">
					<UserCard user={players[0]} />
					<LastMatches matches={matches} />
				</section>
				<section className="container flex justify-between items-center gap-4">
					<FirendsList friends={players} />
					<AchievementsList achievements={achievements} />
				</section>
			</main>
			<Footer />
		</>
	);
};

export default Profile;
