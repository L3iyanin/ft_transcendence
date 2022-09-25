import Links from "./Links";
import { Link } from "react-router-dom";

import { ReactComponent as Logo } from "../../assets/icons/HomeLogo.svg";

const NavBar = () => {
	return (
		<header className="container mx-auto my-10 flex justify-between">
			<div className="container h-16 mx-0 w-auto max-w-xs flex justify-start items-center gap-3">
				<Link to="/">
					<Logo />
				</Link>
			</div>
			<Links />
		</header>
	);
};

export default NavBar;
