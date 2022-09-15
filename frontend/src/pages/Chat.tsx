import NavBar from "../components/NavBar/NavBar";
import InputWithIcon from "../components/UI/inputs/InputWithIcon";
import { ReactComponent as SearchIcon } from "../assets/icons/search.svg";
import ConversationsList from "../components/Pages/Chat/ConversationsList";
import { dmChannels, messages } from "../utils/data/Chat";
import ChatActions from "../components/Pages/Chat/ChatActions";
import { users } from "../utils/data/Users";
import MessagesList from "../components/Pages/Chat/MessagesList";

const Chat: React.FC = () => {

	return (
		<div className="container">
			<NavBar />
			<div className="mt-14" />
			<div className="flex gap-4">
				<div className="basis-1/3">
					<InputWithIcon icon={<SearchIcon />} type="text" placeholder="Search" />
					<ConversationsList channels={dmChannels} />
				</div>
				<div className="basis-2/3 basis">
					<ChatActions currentChannel={dmChannels[0]} username={users[0].username} />
					<MessagesList messages={messages} />
				</div>
			</div>
		</div>
	);
}

export default Chat;