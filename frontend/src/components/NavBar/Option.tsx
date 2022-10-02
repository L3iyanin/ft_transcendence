import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { setYouAreNotPlaying } from "../../reducers/MatchSlice";

const Option = ({ url, children }: IOptionProps) => {

	const navigate = useNavigate();

	const match: IMatchState = useSelector((state: any) => state.match);

	const location = useLocation();

	const onClick = () => {
		navigate(url);
		if (match.areYouPlaying) {
			navigate(0);
			// dispatch(setYouAreNotPlaying())
		}
	};

	return (
		<span
			onClick={onClick}
			className={`cursor-pointer text-center text-base text-white font-medium ${location.pathname === url ? "text-yellow underline underline-offset-8 decoration-2" : ""}`}
		>
			{children}
		</span>
	);
};

export default Option;
