import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { setYouAreNotPlaying } from "../../reducers/MatchSlice";

const Option = ({ url, children }: IOptionProps) => {

	const navigate = useNavigate();

	const match: IMatchState = useSelector((state: any) => state.match);

	// const dispatch = useDispatch();

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
			className="cursor-pointer text-center text-base text-white font-medium"
		>
			{children}
		</span>
	);
};

export default Option;
