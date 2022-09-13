import { matches } from "../utils/data/Match";
import Match from "../components/Match/Match";
import NavBar from "../components/NavBar/NavBar";
import LastMatches from "../components/LastMatches/LastMatches";

const Profile = () => {
	return (
		<div>
			<NavBar />
			<section>
				<LastMatches>
					{matches}
				</LastMatches>
				
			</section>
		</div>
	);
};

export default Profile;
