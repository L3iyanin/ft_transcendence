import { useSelector } from "react-redux";
import LiveMatches from "../Pages/Home/LiveMatches/LiveMatches";
import LoadingSpinner from "../UI/Loading/LoadingSpinner";
import Modal from "../UI/Modals/Modal";


const LiveMatchesPopup: React.FC<{
	open: boolean;
	setOpen: (open: boolean) => void;
}> = ({ open, setOpen }) => {

	const userData: IUserState = useSelector((state: any) => state.user);

	return (
		<Modal open={open} setOpen={setOpen}>
			{userData.user ? (
				<LiveMatches userId={userData.user.id} />
			) : <LoadingSpinner />}
		</Modal>
	);
};

export default LiveMatchesPopup;