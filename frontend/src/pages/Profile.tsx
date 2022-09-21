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
			<div className="container">
				<NavBar />
				<main className="flex flex-col justify-between items-center gap-y-16">
					<section className="w-full flex justify-between items-center gap-14">
						<UserCard user={players[0]} />
						<LastMatches matches={matches} />
					</section>
					<section className="gap-14 w-full flex justify-between items-center">
						<FirendsList friends={players} />
						<AchievementsList achievements={achievements} />
					</section>
				</main>
			</div>
			<Footer />
		</>
	);
};

export default Profile;
