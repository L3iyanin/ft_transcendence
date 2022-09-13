// import { PropsWithChildren } from "react";
import { NavLink } from "react-router-dom";

const Option = ({ url, children }: { url: string; children: string }) => {
	return (
		<NavLink
			to={url}
			className={(state) =>
				"container text-center text-base text-white font-inter font-medium" +
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
