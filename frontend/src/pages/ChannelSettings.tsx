import NavBar from "../components/NavBar/NavBar";
import InputWithIcon from "../components/UI/inputs/InputWithIcon";
import { ReactComponent as SearchIcon } from "../assets/icons/search.svg";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import MembersList from "../components/Pages/ChannelSettings/MembersList";
import { channelMemberInterface } from "../utils/types/channelMember";

const members: channelMemberInterface[] = [
	{
		fullName: "Khalid Belyazid",
		username: "Seven",
		imgUrl: "https://myanimelist.tech/api/avatar?name=seven&animeName=One_Piece",
		isAdmin: true,
		isOwner: true,
		isMuted: false,
		isBanned: false,
	},
	{
		fullName: "Abdelali Ait hmid",
		username: "twelve",
		imgUrl: "https://myanimelist.tech/api/avatar?name=twelve&animeName=One_Piece",
		isAdmin: true,
		isOwner: false,
		isMuted: false,
		isBanned: false,
	},
	{
		fullName: "Annette Black",
		username: "Darlene",
		imgUrl: "https://myanimelist.tech/api/avatar?name=Darlene&animeName=One_Piece",
		isAdmin: false,
		isOwner: false,
		isMuted: false,
		isBanned: true,
	},
];

const ChannelSettings: React.FC = () => {
	const { channelId } = useParams();
	const { t } = useTranslation();

	// ! get channel info using channelId

	return (
		<div className="container">
			<NavBar />
			<h2 className="text-xl font-semibold text-white">
				{channelId} {t("channelSettings.channelSettings")}
			</h2>
			<MembersList members={members} />

			<div className="flex">
				<div>
					<InputWithIcon
						icon={<SearchIcon />}
						type="text"
						placeholder="Search"
					/>
				</div>
			</div>
		</div>
	);
};

export default ChannelSettings;
