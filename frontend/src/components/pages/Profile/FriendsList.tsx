import Friend from "./Friend";
import { useTranslation } from "react-i18next";


const FirendsList: React.FC<{ friends: IGamePlayer[] }> = ({
	friends: friends,
}) => {
	const { t } = useTranslation();
	return (
		<section className="container w-1/2 py-3 px-3 rounded-lg flex flex-col justify-start gap-3 bg-dark-60">
			<h2 className="m-2 px-2 text-2xl font-bold text-white ">
				{t("Friends")}
			</h2>
			{friends.map((friend) => (
				<Friend user={friend} />
			))}
		</section>
	);
};

export default FirendsList;
