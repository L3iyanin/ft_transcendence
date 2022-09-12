import { PropsWithChildren } from "react";

import { ReactComponent as Avatar } from "../../assets/icons/TestAvatar.svg";
import { ReactComponent as Bar } from "../../assets/icons/HomeLogo/Bar.svg";
import { ReactComponent as Logo } from "../../assets/icons/HomeLogo/Logo.svg";

const NavBar = () => {
	return (
		<div className="container mx-auto my-10 flex justify-between">
			<HomeIcon/>
			<Links/>
		</div>
	);
}

const HomeIcon = () => {
	return (
		<div className="container h-16 mx-0 w-auto max-w-xs flex justify-start items-center gap-3">
			<div className="self-start">
				<Bar/>
			</div>
			<div className="self-center">
				<Logo/>
			</div>
			<div className="self-end">
				<Bar/>
			</div>
		</div>
	);
}

const Links = () => {
	return (
		<div className="container h-16 w-auto mx-0 flex justify-center items-center gap-7 grow-1">
			<nav className="container h-12 flex justify-end items-center gap-3">
				<Option>Home</Option>
				<Option>Profile</Option>
				<Option>Settings</Option>
				<Option>Chat</Option>
				<Option>Logout</Option>
			</nav>
			<div className="container flex items-center grow-0">
				<Avatar className="h-8"/>
			</div>
		</div>
	);
}

const Option = (props : PropsWithChildren) => {
	return (
	<a href="#" className="text-center text-base text-white font-inter font-medium active:text-yellow active:underline-offset-2">
		{props.children}
	</a>
	);
}


export default NavBar;