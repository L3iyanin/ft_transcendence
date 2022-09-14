import NavBar from "../components/NavBar/NavBar";
import InputWithIcon from "../components/UI/inputs/InputWithIcon";
import { ReactComponent as SearchIcon } from "../assets/icons/search.svg";

const Chat: React.FC = () => {
	return (
		<div className="container">
			<NavBar />
			<div className="mt-14" />
			<div className="flex">
				<div>
					<InputWithIcon icon={<SearchIcon />} type="text" placeholder="Search" />
					<div className="bg-dark-60 mt-5 rounded-2xl p-5 text-white">
						fake chat
					</div>
				</div>
			</div>
		</div>
	);
}

export default Chat;