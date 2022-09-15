import NavBar from "../components/NavBar/NavBar";
import InputWithIcon from "../components/UI/inputs/InputWithIcon";
import { ReactComponent as SearchIcon } from "../assets/icons/search.svg";
import ConversationsList from "../components/Pages/Chat/ConversationsList";

const Chat: React.FC = () => {

	return (
		<div className="container">
			<NavBar />
			<div className="mt-14" />
			<div className="flex">
				<div className="basis-1/3">
					<InputWithIcon icon={<SearchIcon />} type="text" placeholder="Search" />
					<ConversationsList />
				</div>
			</div>
		</div>
	);
}

export default Chat;