import Friend from "./Friend";
import { useTranslation } from "react-i18next";

const FirendsList: React.FC<{ friends: IGamePlayer[] }> = ({
	friends: friends,
}) => {
	const { t } = useTranslation();

	return (
		<section className="container min-w-[300px] h-[480px] m-2 py-3 pl-1 pr-2 rounded-lg flex flex-col justify-start gap-3 bg-dark-60">
			<h2 className="m-2 px-4 text-2xl font-bold text-white ">
				{t("Friends")}
			</h2>
			<div className="container max-h-[410px] px-6 rounded-lg overflow-y-auto">
				{friends.map((friend, index, array) => {
					if (index < array.length - 1) {
						return (
							<>
								<Friend key={index} user={friend} />
								<hr className="my-2 rounded-md border-dark-blue border-t-4" />
							</>
						);
					} else {
						return <Friend key={index} user={friend} />;
					}
				})}
			</div>
		</section>
	);
};

export default FirendsList;
