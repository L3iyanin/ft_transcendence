import IconWithLabel from "../../../UI/IconWithLabel/IconWithLabel";
import { ReactComponent as ChatIcon } from "../../../../assets/icons/chat.svg";
import { ReactComponent as ProfileIcon } from "../../../../assets/icons/profile.svg";
import { useTranslation } from "react-i18next";
import RoundedHr from "../../../UI/Hr/RoundedHr";

const WatchersList: React.FC<{
	watchers: IUser[];
}> = ({ watchers }) => {

	const { t } = useTranslation();

	return (
		<div className="bg-dark-60 rounded-lg p-6 grow max-h-[480px] overflow-y-auto">
			<h2 className="text-3xl font-bold mb-6">{t("gamePage.watchTheMatch")}:</h2>
			{
				watchers.map((watcher) => (
					<WatcherCard watcher={watcher} key={watcher.id} />
				))
			}
		</div>
	);
};

export default WatchersList;

const WatcherCard: React.FC<{ watcher: IUser }> = ({ watcher }) => {

	const { t } = useTranslation();

	return (
		<>
			<div className="flex justify-between">
				<div className="flex gap-5">
					<img
						src={watcher.imgUrl}
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
						linkToGo={`/chat`}
						icon={<ChatIcon />}
						label={t("chat")}
						labelStyle="text-red"
					/>
					<IconWithLabel
						linkToGo={`/profile/${watcher.id}`}
						icon={<ProfileIcon className="w-4 h-4" />}
						label={t("profile")}
						labelStyle="text-yellow"
					/>
				</div>
			</div>
			<RoundedHr />
		</>
	);
};
