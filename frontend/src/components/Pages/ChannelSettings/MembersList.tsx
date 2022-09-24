import { useTranslation } from "react-i18next";
import { kickOutMember, makeAdminMember, makeMemberAdmin } from "../../../services/channel/settings";
import { channelMemberInterface } from "../../../utils/types/channelSettings";
import ErrorAlert from "../../UI/Error";
import LoadingSpinner from "../../UI/Loading/LoadingSpinner";
import SuccesAlert from "../../UI/SuccesAlert";
import MemberCart from "./MemberCart";

const MembersList: React.FC<{
	members: channelMemberInterface[];
	channelInfo: IChatChannel | null;
	setAdminInChannelState: (userId: string) => void;
	setMemberInChannelState: (userId: string) => void;
}> = ({ channelInfo, setAdminInChannelState, setMemberInChannelState }) => {

	const { t } = useTranslation();

	const makeAdminHandler = (userId: string) => {
		if (channelInfo) {
			makeMemberAdmin(channelInfo.id.toString(), userId)
				.then((res) => {
					console.log(res);
					SuccesAlert(res.message);
					setAdminInChannelState(userId);
				})
				.catch((err) => {
					console.log(err);
					ErrorAlert(err.message);
				});
		}
	};

	const kickOutHandler = (userId: string) => {
		if (channelInfo) {
			kickOutMember(channelInfo.id.toString(), userId)
				.then((res) => {
					console.log(res);
					SuccesAlert(res.message);
					// setMemberInChannelState(userId);
				}
				)
				.catch((err) => {
					console.log(err);
					ErrorAlert(err.message);
				}
				);
		}
	};

	const makeMemberHandler = (userId: string) => {
		if (channelInfo) {
			makeAdminMember(channelInfo.id.toString(), userId)
				.then((res) => {
					console.log(res);
					SuccesAlert(res.message);
					setMemberInChannelState(userId);
				})
				.catch((err) => {
					console.log(err);
					ErrorAlert(err.message);
				});
		}
	};

	if (!channelInfo) {
		return (
			<div className="relative h-24 bg-dark-60 my-4 rounded-2xl">
				<LoadingSpinner />
			</div>
		);
	}

	return (
		<div className="">
			<ul>
				{channelInfo.members.map((member, index) => {
					return <MemberCart
							member={member}
							key={index}
							makeAdminHandler={makeAdminHandler}
							makeMemberHandler={makeMemberHandler}
							kickOutHandler={kickOutHandler}
							/>;
				})}
			</ul>
		</div>
	);
};

export default MembersList;
