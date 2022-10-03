import { useTranslation } from "react-i18next";
import {
	banMember,
	kickOutMember,
	makeAdminMember,
	makeMemberAdmin,
	muteMember,
	unbanMember,
	unmuteMember,
} from "../../../services/channel/settings";
import { channelMemberInterface } from "../../../utils/types/channelSettings";
import ErrorAlert from "../../UI/Error";
import LoadingSpinner from "../../UI/Loading/LoadingSpinner";
import SuccesAlert from "../../UI/SuccesAlert";
import MemberCart from "./MemberCart";

const MembersList: React.FC<{
	channelInfo: IChatChannel | null;
	refreshHandler: () => void;
}> = ({ channelInfo, refreshHandler }) => {
	const { t } = useTranslation();

	if (!channelInfo) {
		return (
			<div className="relative h-24 bg-dark-60 my-4 rounded-2xl">
				<LoadingSpinner />
			</div>
		);
	}

	const makeAdminHandler = (userId: string) => {
		makeMemberAdmin(channelInfo.id.toString(), userId)
			.then((res) => {
				SuccesAlert(res.message);
				refreshHandler();
			})
			.catch((err) => {
				console.error(err);
				ErrorAlert(err);
			});
	};

	const kickOutHandler = (userId: string) => {
		kickOutMember(channelInfo.id.toString(), userId)
			.then((res) => {
				SuccesAlert(res.message);
				refreshHandler();
			})
			.catch((err) => {
				console.error(err);
				ErrorAlert(err);
			});
	};

	const makeMemberHandler = (userId: string) => {
		makeAdminMember(channelInfo.id.toString(), userId)
			.then((res) => {
				SuccesAlert(res.message);
				refreshHandler();
			})
			.catch((err) => {
				console.error(err);
				ErrorAlert(err);
			});
	};

	const banMemberHandler = (userId: string, duration: number) => {
		banMember(channelInfo.id.toString(), userId, duration)
			.then((res) => {
				SuccesAlert(res.message);
				refreshHandler();
			})
			.catch((err) => {
				console.error(err);
				ErrorAlert(err);
			});
	};

	const unBanMemberHandler = (userId: string) => {
		unbanMember(channelInfo.id.toString(), userId)
			.then((res) => {
				SuccesAlert(res.message);
				refreshHandler();
			})
			.catch((err) => {
				console.error(err);
				ErrorAlert(err);
			});
	};

	const muteMemberHandler = (userId: string, duration: number) => {
		muteMember(channelInfo.id.toString(), userId, duration)
			.then((res) => {
				SuccesAlert(res.message);
				refreshHandler();
			})
			.catch((err) => {
				console.error(err);
				ErrorAlert(err);
			});
	};

	const unMuteMemberHandler = (userId: string) => {
		unmuteMember(channelInfo.id.toString(), userId)
			.then((res) => {
				SuccesAlert(res.message);
				refreshHandler();
			})
			.catch((err) => {
				console.error(err);
				ErrorAlert(err);
			});
	};


	return (
		<div className="mt-6">
			<ul>
				{channelInfo.members.map((member, index) => {
					return (
						<MemberCart
							member={member}
							key={index}
							makeAdminHandler={makeAdminHandler}
							makeMemberHandler={makeMemberHandler}
							kickOutHandler={kickOutHandler}
							banMemberHandler={banMemberHandler}
							unBanMemberHandler={unBanMemberHandler}
							muteMemberHandler={muteMemberHandler}
							unMuteMemberHandler={unMuteMemberHandler}
						/>
					);
				})}
			</ul>
		</div>
	);
};

export default MembersList;
