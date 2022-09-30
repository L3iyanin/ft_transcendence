import Option from "./Option";
import { ReactComponent as CloseIcon } from "../../assets/icons/invalid.svg";
import { ReactComponent as MenuIcon } from "../../assets/icons/menu.svg";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../reducers/UserSlice";
import { useNavigate } from "react-router-dom";
import { Socket } from "socket.io-client";
import { setMatching } from "../../reducers/MatchSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { logout42 } from "../../services/auth/auth42";
import ErrorAlert from "../UI/Error";
import SuccesAlert from "../UI/SuccesAlert";
import { useState } from "react";

const Links = () => {
	const { t } = useTranslation();

	const dispatch = useDispatch();

	const navigate = useNavigate();

	const userData = useSelector((state: any) => state.user);

	const onLogout = () => {
		logout42()
			.then((res) => {
				SuccesAlert(res.message);
				dispatch(logout());
				navigate("/login");
			})
			.catch((err) => {
				console.error(err);
				ErrorAlert(err);
			});
	};

	const [openMobileLinks, setOpenMobileLinks] = useState(false);

	const onOpenMobileLinks = () => {
		setOpenMobileLinks(true);
	};

	const onCloseMobileLinks = () => {
		setOpenMobileLinks(false);
	};

	const Options = (
		<>
			<Option url="/home">{t("home")}</Option>
			<Option url="/profile">{t("profile")}</Option>
			<Option url="/settings">{t("settings")}</Option>
			<Option url="/chat">{t("chat")}</Option>
			<Option url="/search">{t("search")}</Option>
			<span
				onClick={onLogout}
				className="cursor-pointer text-center text-base text-white font-medium"
			>
				{t("logout")}
			</span>
		</>
	);

	const OptionsLinks = (
		<div className="container h-16 w-auto mx-0 lg:flex justify-center items-center gap-7 grow-1 hidden">
			<nav className="container lg:h-12 flex justify-end items-center gap-5 z-20  ">
				{Options}
			</nav>
			<Link className="container flex items-center grow-0" to="/profile">
				<img
					src={userData.user.imgUrl}
					className="h-8 w-8 rounded-full"
					alt=""
				/>
			</Link>
		</div>
	);

	const OptionsLinksMobile = (
		<div className="container h-16 lg:w-auto mx-0 lg:hidden justify-center items-center gap-7 grow-1 w-full absolute lg:static z-20">
			<nav className="container lg:h-12 flex justify-end items-center gap-5 flex-col lg:flex-row z-20 bg-black lg:bg-transparent w-full mt-16 lg:mt-0 py-4 lg:py-0">
				{Options}
			</nav>
		</div>
	);

	return (
		<>
			{OptionsLinks}
			{openMobileLinks && OptionsLinksMobile}
			{!openMobileLinks ? (
				<MenuIcon
					className="fill-white lg:hidden cursor-pointer"
					onClick={onOpenMobileLinks}
				/>
			) : (
				<CloseIcon
					className="w-6 h-6 lg:hidden cursor-pointer z-50"
					onClick={onCloseMobileLinks}
				/>
			)}
		</>
	);
};

export default Links;

const LinksOptions = () => {};
