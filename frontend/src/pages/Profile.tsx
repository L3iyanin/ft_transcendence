import { useParams } from "react-router-dom";

import { lastMatches } from "../utils/data/Match";

import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
import UserCard from "../components/UserCard/UserCard";
import LastMatches from "../components/LastMatches/LastMatches";
import FirendsList from "../components/Pages/Profile/FriendsList/FriendsList";
import AchievementsList from "../components/Pages/Profile/AchievementsList/AchievementsList";
import { useSelector } from "react-redux";


const Profile = () => {

	let { userId } = useParams();

	const userData: IUserState = useSelector((state: any) => state.user);

	if (!userData.user) {
		return null;
	}

	if (!userId) {
		console.log("no user id");		userId = userData.user.id.toString();
	}

	return (
		<>
			<div className="container">
				<NavBar />
				<main className="flex flex-col justify-between items-center gap-y-16">
					<section className="w-full flex flex-wrap justify-around items-center gap-14">
						<UserCard userId={userId} />
						<LastMatches matches={lastMatches} userId={+userId} isInProfile={true}/>
					</section>
					<section className="w-full flex flex-wrap justify-between items-center">
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
