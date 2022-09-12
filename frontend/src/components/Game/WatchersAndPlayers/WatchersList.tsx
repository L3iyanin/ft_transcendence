import { IGameWatcher } from "../../../utils/types/Game";
import IconWithLabel from "../../UI/IconWithLabel/IconWithLabel";
import { ReactComponent as ChatIcon } from "../../../assets/icons/chat.svg";
import { ReactComponent as ProfileIcon } from "../../../assets/icons/profile.svg";

const WatchersList: React.FC<{
	watchers: IGameWatcher[];
}> = ({ watchers }) => {
	return (
		<div className="bg-dark-60 rounded-lg p-6 grow max-h-[480px] overflow-y-auto">
			<h2 className="text-3xl font-bold mb-6">Watching The Match:</h2>
			{
				watchers.map((watcher, index) => (
					<WatcherCard watcher={watcher} key={watcher.id} />
				))

			}
		</div>
	);
};

export default WatchersList;

const WatcherCard: React.FC<{ watcher: IGameWatcher }> = ({ watcher }) => {
	return (
		<>
			<div className="flex justify-between">
				<div className="flex gap-5">
					<img
						src={watcher.imageUrl}
						alt=""
						className="w-[49px] h-[49px] rounded-full"
					/>
					<div>
						<div className="font-medium">{watcher.fullName}</div>
						<div className="text-beige">{watcher.username}</div>
					</div>
				</div>
				<div className="flex flex-col justify-between">
					<IconWithLabel
						linkToGo={watcher.charUrl}
						icon={<ChatIcon />}
						label="Chat"
						labelStyle="text-red"
					/>
					<IconWithLabel
						linkToGo={watcher.profileUrl}
						icon={<ProfileIcon />}
						label="Profile"
						labelStyle="text-yellow"
					/>
				</div>
			</div>
			<hr className="my-4 border-dark-blue border-2 rounded" />
		</>
	);
};
