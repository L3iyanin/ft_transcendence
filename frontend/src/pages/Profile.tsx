import { matches } from "../utils/data/Match";
import { players } from "../utils/data/Players";
import Match from "../components/Match/Match";
import NavBar from "../components/NavBar/NavBar";
import LastMatches from "../components/LastMatches/LastMatches";
import UserCard from "../components/UserCard/UserCard";

const Profile = () => {
	return (
		<div>
			<NavBar />
			<main className="container flex justify-between items-center gap-8">
				<UserCard>
					{players[0]}
				</UserCard>
				<LastMatches >
					{matches}
				</LastMatches>
				
			</main>
		</div>
	);
};

export default Profile;
