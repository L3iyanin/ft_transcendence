import { useParams } from "react-router-dom";

import { lastMatches } from "../utils/data/Match";

import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
import UserCard from "../components/UserCard/UserCard";
import LastMatches from "../components/LastMatches/LastMatches";
import FirendsList from "../components/Pages/Profile/FriendsList/FriendsList";
import AchievementsList from "../components/Pages/Profile/AchievementsList/AchievementsList";


const Profile = () => {

	const { userId } = useParams();

	return (
		<>
			<div className="container">
				<NavBar />
				<main className="flex flex-col justify-between items-center gap-y-16">
					<section className="w-full flex justify-between items-center gap-14">
						<UserCard userId={userId} />
						<LastMatches matches={lastMatches} isInProfile={true}/>
					</section>
					<section className="gap-14 w-full flex justify-between items-center">
						<FirendsList userId={userId} />
						<AchievementsList userId={userId} />
					</section>
				</main>
			</div>
			<Footer />
		</>
	);
};

export default Profile;
