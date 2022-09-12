import Links from "./Links";

import { ReactComponent as Logo } from "../../assets/icons/HomeLogo.svg";

const NavBar = () => {
	return (
		<div className="container mx-auto my-10 flex justify-between">
			<div className="container h-16 mx-0 w-auto max-w-xs flex justify-start items-center gap-3">
				<Logo />
			</div>
			<Links />
		</div>
	);
};

export default NavBar;
