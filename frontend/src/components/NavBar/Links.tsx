import Option from './Option'

import { ReactComponent as Avatar } from "../../assets/icons/TestAvatar.svg";


const Links = () => {
	return (
		<div className="container h-16 w-auto mx-0 flex justify-center items-center gap-7 grow-1">
			<nav className="container h-12 flex justify-end items-center gap-5">
				<Option url="/home">Home</Option>
				<Option url="/profile">Profile</Option>
				<Option url="/settings">Settings</Option>
				<Option url="/chat">Chat</Option>
				<Option url="/">Logout</Option>
			</nav>
			<div className="container flex items-center grow-0">
				<Avatar className="h-8"/>
			</div>
		</div>
	);
}

export default Links;