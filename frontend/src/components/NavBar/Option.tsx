import { NavLink } from "react-router-dom";

const Option = ({ url, children } : IOptionProps) => {
	return (
		<NavLink
			to={url}
			className={(state) =>
				"text-center text-base text-white font-medium" +
				(state.isActive
					? " text-yellow underline underline-offset-8 decoration-2"
					: "")
			}
		>
			{children}
		</NavLink>
	);
};

export default Option;
