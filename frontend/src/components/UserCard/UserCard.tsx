import { ReactComponent as AchivementIcon } from "../../assets/icons/achivement.svg";
import { ReactComponent as StartChatIcon } from "../../assets/icons/StartChat.svg";
import { ReactComponent as BlockUserIcon } from "../../assets/icons/BlockUser.svg";
import { ReactComponent as AddIcon } from "../../assets/icons/add.svg";
import { ReactComponent as UnLockedIcon } from "../../assets/icons/unlockDark.svg";
import Stat from "../Stat/Stat";
import { useEffect, useState } from "react";
import { addFriend, blockUser, getProfileInfo, startChat, unblockUser } from "../../services/profile/profile";
import LoadingSpinner from "../UI/Loading/LoadingSpinner";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { isResNotOk } from "../../utils/helper/httpHelper";
import ErrorAlert, { ErrorAlertWithMessage } from "../UI/Error";
import { useSelector } from "react-redux";
import { users } from "../../utils/data/Users";
import { UserStatusEnum } from "../../utils/constants/enum";
import SuccesAlert from "../UI/SuccesAlert";
import { useNavigate } from "react-router-dom";

const MAX_ACHIVEMENTS = import.meta.env.VITE_APP_MAX_ACHIVEMENTS;

const UserCard: React.FC<{ userId?: string }> = ({ userId }) => {
	const LocalUserData = useSelector((state: any) => state.user.user);

	const { t } = useTranslation();

	const [user, setUser] = useState<IUser | null>(null);

	let isMe = userId === undefined || LocalUserData.id === +userId;

	const navigate = useNavigate();

	useEffect(() => {
		isMe = LocalUserData.id === userId || userId === undefined;
		const profileId = userId || LocalUserData.id;

		getProfileInfo(profileId)
			.then((res) => {
				if (isResNotOk(res) === true) {
					ErrorAlert(res);
					return;
				}

				const userData = res;
				// setUser(users[0]);
				setUser(_ => ({
					id: userData.id,
					username: userData.username,
					fullName: userData.fullName,
					imgUrl: userData.imgUrl,
					numberOfAchievements: userData.numberOfAchievements,
					numberOfFriends: userData.numberOfFriends,
					wins: userData.wins,
					losses: userData.losses,
					userStatus: userData.userStatus,
				}))
			})
			.catch((err) => {
				ErrorAlert(err);
			});
	}, [userId]);

	const addFriendHandler = () => {
		addFriend(userId!)
		.then(res => {
			SuccesAlert(res.message);
			setUser(prevUser => ({
				...prevUser!,
				userStatus: UserStatusEnum.FRIEND,
			}))
		})
		.catch((err) => {
			ErrorAlert(err);
		});
	}

	const startChatHandler = () => {
		startChat(userId!)
		.then(res => {
			navigate(`/chat`);
		})
		.catch((err) => {
			ErrorAlert(err);
		});
	}


	const blockUserHandler = () => {
		blockUser(userId!)
		.then(res => {
			SuccesAlert(res.message);
			setUser(prevUser => ({
				...prevUser!,
				userStatus: UserStatusEnum.BLOCKED,
			}))
		})
		.catch((err) => {
			ErrorAlertWithMessage(err.response.data.message);
		});
	}

	const unblockUserHandler = () => {
		unblockUser(userId!)
		.then(res => {
			SuccesAlert(res.message);
			setUser(prevUser => ({
				...prevUser!,
				userStatus: UserStatusEnum.FRIEND,
			}))
		})
		.catch((err) => {
			ErrorAlertWithMessage(err.response.data.message);
		});
	}

	if (!user) {
		return (
			<section className="relative min-w-[395px] h-[368px] rounded-2xl flex flex-col bg-dark-60">
				<LoadingSpinner />
			</section>
		);
	}

	return (
		<section className="mb-10 xl:mb-0 xl:basis-3/12 basis-10/12 md:basis-6/12 h-[368px] rounded-2xl flex flex-col bg-dark-60">
			<div className="grow pt-7 pb-7 container m-0 flex flex-col items-center justify-center gap-3 text-white">
				<img
					src={user.imgUrl}
					alt={user.username + ": avatar"}
					className="w-24 h-24 rounded-full"
				/>
				<h3 className="text-xl font-bold m-0">{user.fullName}</h3>
				<p className="m-0 text-beige">{user.username}</p>
				<div className="flex gap-4">
					<Stat stat={t("online")} qty={user.wins!} />
					<Stat stat={t("friends")} qty={user.numberOfFriends!} />
				</div>
				<div className="flex gap-4">
					<Stat stat={t("wins")} qty={user.wins!} />
					<Stat stat={t("losses")} qty={user.losses!} />
				</div>
				<div className="flex items-center gap-2">
					<AchivementIcon />
					<span className="text-xs">
						{user.numberOfAchievements}/{MAX_ACHIVEMENTS}{" "}
						{t("homePage.achievements")}
					</span>
				</div>
			</div>
			{ !isMe && user.userStatus === UserStatusEnum.NONE && <UserCardFooterForNONE addFriendHandler={addFriendHandler} /> }
			{ !isMe && user.userStatus === UserStatusEnum.FRIEND && <UserCardFooterForFRIEND startChatHandler={startChatHandler} blockUserHandler={blockUserHandler} /> }
			{ !isMe && user.userStatus === UserStatusEnum.BLOCKED && <UserCardFooterForBLOCK unblockUserHandler={unblockUserHandler} /> }
		</section>
	);
};

export default UserCard;

const UserCardFooterForFRIEND: React.FC<{
	startChatHandler: () => void;
	blockUserHandler: () => void;
}> = ({ startChatHandler, blockUserHandler }) => {
	const { t } = useTranslation();
	return (
		<footer className="container h-10 flex justify-center items-center gap-0">
			<div onClick={startChatHandler} className="cursor-pointer container py-3 rounded-bl-2xl flex justify-center items-center gap-1 bg-yellow text-black">
				<StartChatIcon className="" />
				<p>{t("startchat")}</p>
			</div>
			<div onClick={blockUserHandler} className="cursor-pointer container py-3 rounded-br-2xl flex justify-center items-center gap-1 bg-red text-white">
				<BlockUserIcon className="" />
				<p>{t("blockUser")}</p>
			</div>
		</footer>
	);
};

const UserCardFooterForNONE: React.FC<{
	addFriendHandler: () => void;
}> = ({ addFriendHandler }) => {
	const { t } = useTranslation();
	return (
		<div onClick={addFriendHandler} className="cursor-pointer container py-3 rounded-bl-2xl rounded-br-2xl flex justify-center items-center gap-2 bg-green text-white">
			<AddIcon />
			<p>{t("addFriend")}</p>
		</div>
	);
};

const UserCardFooterForBLOCK: React.FC<{
	unblockUserHandler: () => void;
}> = ({ unblockUserHandler }) => {
	const { t } = useTranslation();
	return (
		<div onClick={unblockUserHandler} className="cursor-pointer container py-3 rounded-bl-2xl rounded-br-2xl flex justify-center items-center gap-2 bg-beige text-dark-blue">
			<UnLockedIcon />
			<p>{t("unblockUser")}</p>
		</div>
	);
};

