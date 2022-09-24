import { useState } from "react";
import { ReactComponent as SearchIcon } from "../../../assets/icons/search.svg";

import { useTranslation } from "react-i18next";
import InputWithIcon from "../../UI/inputs/InputWithIcon";
import UserCard from "./UserCard";

const usersOriginalList: IUser[] = [
	{
		id: 1,
		fullName: "someone",
		username: "hola",
		imgUrl: "https://myanimelist.tech/api/avatar?&name=aaitsdmi&animeName=One_Piece",
		isFriend: false,
	},
	{
		id: 2,
		fullName: "user zero",
		username: "user0",
		imgUrl: "https://myanimelist.tech/api/avatar?&name=cxdD&animeName=One_Piece",
		isFriend: false,
	},
	{
		id: 3,
		fullName: "user one",
		username: "user1",
		imgUrl: "https://myanimelist.tech/api/avatar?&name=casdxd&animeName=One_Piece",
		isFriend: true,
	},
	{
		id: 4,
		fullName: "user two",
		username: "user2",
		imgUrl: "https://myanimelist.tech/api/avatar?&name=cxdXX&animeName=One_Piece",
		isFriend: false,
	},
];

const UsersList: React.FC = () => {
	const { t } = useTranslation();
	const [usersList, setUsersList] = useState(usersOriginalList);

	const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		const searchValue = e.target.value;
		const filteredUsersList = usersOriginalList.filter((user) =>
			user.username.toLowerCase().includes(searchValue.toLowerCase())
		);
		setUsersList(filteredUsersList);
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
				{usersList.map((user) => (
					<UserCard key={user.id} user={user} />
				))}
			</ul>
		</div>
	);
};

export default UsersList;
