import ButtonWithIcon from "../../UI/Buttons/ButtonWithIcon";
import Input from "../../UI/inputs/Input";
import MessageCard from "./MessageCard";

const MessagesList: React.FC<{
	messages: IMessage[];
}> = ({ messages }) => {
	const message = messages[0];

	return (
		<div className="flex flex-col bg-dark-60 mt-5 rounded-2xl p-5 text-white h-[70vh] overflow-y-auto">
			<div className="overflow-auto">
				{
					messages.map((message) => (
						<MessageCard key={message.id} message={message} />
					))
				}
			</div>
			<div className="mt-auto flex gap-4">
				<Input type="text" placeholder="Type a message..." />
				<ButtonWithIcon
					icon={
						<img
							src="/imgs/icons/muchi-muchi.png"
							alt="muchi muchi"
						/>
					}
					label="Send"
					className="bg-white text-dark-60 !rounded-lg"
				/>
			</div>
		</div>
	);
};

export default MessagesList;
