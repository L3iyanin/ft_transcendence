import NavBar from "../components/NavBar/NavBar";
import Hifd from "../components/pages/Settings/Hifd";
import How2FA from "../components/pages/Settings/How2FA";
import QRZone from "../components/pages/Settings/QRZone";
import UserSettingsCard from "../components/pages/Settings/UserSettingsCard";
import { users } from "../utils/data/Users";

const Settings = () => {
	return (
		<div>
			<NavBar />
			<main className="container px-24 flex flex-col gap-10">
				<section className="container flex justify-between gap-10">
					<UserSettingsCard user={users[2]} />
					<QRZone />
				</section>
				<How2FA/>
				<Hifd/>
			</main>
		</div>
	);
};

export default Settings;
