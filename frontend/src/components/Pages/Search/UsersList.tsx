import { useEffect, useState } from "react";
import { ReactComponent as SearchIcon } from "../../../assets/icons/search.svg";

import { useTranslation } from "react-i18next";
import InputWithIcon from "../../UI/inputs/InputWithIcon";
import UserCard from "./UserCard";
import { getAllUsers } from "../../../services/search/search";
import LoadingSpinner from "../../UI/Loading/LoadingSpinner";
import { ErrorAlertWithMessage } from "../../UI/Error";

const UsersList: React.FC = () => {
	const { t } = useTranslation();
	const [usersList, setUsersList] = useState<IUser[] | null>(null);
	const [savedUsersList, setSavedUsersList] = useState<IUser[] | null>(null);

	useEffect(() => {
		getAllUsers()
			.then((users) => {
				setSavedUsersList(users);
				setUsersList(users)
			})
			.catch((err) => {
				ErrorAlertWithMessage(err.message.data.message);
			});
	}, []);

	const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		const searchValue = e.target.value;
		if (savedUsersList) {
			setUsersList(
				savedUsersList.filter((user) => {
					return user.username
						.toLowerCase()
						.includes(searchValue.toLowerCase());
				})
			);
		}
	};

	return (
		<div className="container">
			<div className="flex flex-row justify-start">
				<InputWithIcon
					icon={<SearchIcon />}
					type="text"
					placeholder="Search"
					onChange={searchHandler}
				/>
			</div>
			<ul className="container">
				{usersList &&
					usersList.map((user) => (
						<UserCard key={user.id} user={user} />
					))}
				{!usersList && (
					<div className="relative h-24 bg-dark-60 my-4 rounded-2xl">
						<LoadingSpinner />
					</div>
				)}
				{usersList && usersList.length === 0 && (
					<div className="flex items-center justify-center h-24 bg-dark-60 my-4 rounded-2xl">
						<p className="text-white text-lg">
							{t("searchPage.noUsersFound")}
						</p>
					</div>
				)}
			</ul>
		</div>
	);
};

export default UsersList;
