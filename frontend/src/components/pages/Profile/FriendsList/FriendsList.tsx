import Friend from "./Friend";
import { useTranslation } from "react-i18next";
import { players } from "../../../../utils/data/Players";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getFriends } from "../../../../services/profile/profile";
import { isResNotOk } from "../../../../utils/helper/httpHelper";
import ErrorAlert from "../../../UI/Error";
import LoadingSpinner from "../../../UI/Loading/LoadingSpinner";

const FirendsList: React.FC<{ userId?: string }> = ({ userId }) => {
	const LocalUserData = useSelector((state: any) => state.user.user);

	const [friends, setFriends] = useState<IUser[] | null>(null);

	const { t } = useTranslation();

	useEffect(() => {
		const profileId = userId || LocalUserData.id;

		getFriends(profileId)
			.then((res) => {
				if (isResNotOk(res)) {
					ErrorAlert(res);
					return;
				}
				setFriends(res);
			})
			.catch((err) => {
				ErrorAlert(err);
			});
	}, []);

	if (friends === null) {
		return (
			<section className="relative basis-6/12 h-[480px] py-3 pl-1 pr-2 rounded-2xl flex flex-col justify-start gap-3 bg-dark-60">
				<LoadingSpinner />
			</section>
		);
	}

	return (
		<section className="relative basis-6/12 h-[480px] py-3 pl-1 pr-2 rounded-2xl flex flex-col justify-start gap-3 bg-dark-60">
			<h2 className="m-2 px-4 text-2xl font-bold text-white ">
				{t("Friends")}
			</h2>
			<div className=" max-h-[410px] px-6 rounded-lg overflow-y-auto">
				{friends.length > 0 &&
					friends.map((friend, index, array) => {
						if (index < array.length - 1) {
							return (
								<div key={index}>
									<Friend user={friend} />
									<hr className="my-2 rounded-md border-dark-blue border-t-4" />
								</div>
							);
						} else {
							return <Friend key={index} user={friend} />;
						}
					})}
				{friends.length === 0 && (
					<p className="absolute top-1/2 text-xl left-1/2 text-white -translate-x-1/2 -translate-y-1/2">
						{t("youHaveNoFriends")}
					</p>
				)}
			</div>
		</section>
	);
};

export default FirendsList;
