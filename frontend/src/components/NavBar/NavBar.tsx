import Links from "./Links";
import { Link } from "react-router-dom";

import { ReactComponent as Logo } from "../../assets/icons/HomeLogo.svg";
import { useTranslation } from "react-i18next";
import moment from "moment";
import Matching from "./Matching";

const NavBar = () => {

	return (
		<header className="container mx-auto my-10 flex flex-wrap justify-between">
			<div className=" mx-0 w-auto flex flex-wrap justify-start items-center">
				<Link to="/">
					<Logo />
				</Link>
				<Matching />
			</div>
			<Links />
		</header>
	);
};

export default NavBar;
