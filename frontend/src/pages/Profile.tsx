
import {matches} from "../utils/data/Match"
import Match from "../components/Match/Match"

const Profile = () => {
	return (
		<Match className="w-3/5 border-beige" scoreStyle="bg-grey text-white">{matches[0]}</Match>
	);
}

export default Profile;