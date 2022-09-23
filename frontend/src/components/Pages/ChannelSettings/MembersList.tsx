import { useTranslation } from "react-i18next";
import { channelMemberInterface } from "../../../utils/types/channelSettings";
import LoadingSpinner from "../../UI/Loading/LoadingSpinner";
import MemberCart from "./MemberCart";

const MembersList: React.FC<{
	members: channelMemberInterface[];
	channelInfo: IChatChannel | null;
}> = ({ channelInfo }) => {
	const { t } = useTranslation();

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
					return <MemberCart member={member} key={index} />;
				})}
			</ul>
		</div>
	);
};

export default MembersList;
