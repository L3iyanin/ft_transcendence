import MessageCard from "./MessageCard";

const MessagesList: React.FC<{
	messages: IMessage[];
}> = ({ messages }) => {

	const message = messages[0];

	return (
		<div className="bg-dark-60 mt-5 rounded-2xl p-5 text-white h-[70vh] overflow-y-auto">
			<div>
				<MessageCard message={message} />
			</div>
			<div>
				{/* add input component */}
			</div>
		</div>
	);
};

export default MessagesList;
