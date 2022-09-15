import { useTranslation } from "react-i18next";
import { channelMemberInterface } from "../../../utils/types/channelMember";
import MemberCart from "./MemberCart";

const MembersList: React.FC<{ members: channelMemberInterface[] }> = (
	props
) => {
	const { t } = useTranslation();

	return (
		<div className="container">
			<ul>
				{props.members.map((member, index) => {
					return <MemberCart member={member} key={index} />;
				})}
			</ul>
		</div>
	);
};

export default MembersList;
