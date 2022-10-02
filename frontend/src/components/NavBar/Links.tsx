import Option from "./Option";
import { ReactComponent as CloseIcon } from "../../assets/icons/invalid.svg";
import { ReactComponent as MenuIcon } from "../../assets/icons/menu.svg";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../reducers/UserSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { Socket } from "socket.io-client";
import { setMatching } from "../../reducers/MatchSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { logout42 } from "../../services/auth/auth42";
import ErrorAlert from "../UI/Error";
import SuccesAlert from "../UI/SuccesAlert";
import { useEffect, useState } from "react";
import { addNotification } from "../../reducers/ChatSlice";
import { usePrevLocation } from "../../hooks/usePropmpt";
import LiveMatchesPopup from "./LiveMatchesPopup";

const Links = () => {
	const { t } = useTranslation();

	const dispatch = useDispatch();

	const navigate = useNavigate();

	const userData = useSelector((state: any) => state.user);

	const [openLivematches, setOpenLivematches] = useState(false);

	const chatSocket: IChatSocket = useSelector((state: any) => state.chat);

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

	const onShowLives = () => {
		setOpenLivematches(true);
	};

	const [openMobileLinks, setOpenMobileLinks] = useState(false);

	const onOpenMobileLinks = () => {
		setOpenMobileLinks(true);
	};

	const onCloseMobileLinks = () => {
		setOpenMobileLinks(false);
	};

	const location = useLocation();

	const Options = (
		<>
			<Option url="/home">{t("home")}</Option>
			<Option url="/profile">{t("profile")}</Option>
			<Option url="/settings">{t("settings")}</Option>
			<Option url="/chat">{t("chat")}</Option>
			<Option url="/search">{t("search")}</Option>
			<span
				onClick={onShowLives}
				className="cursor-pointer text-center text-base text-white font-medium"
			>{t("liveMatches")}</span>
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
			{/* <Link className="relative container flex items-center grow-0" to="/profile"> */}
			<Link
				className="relative container flex items-center grow-0"
				to="/chat"
			>
				<img
					src={userData.user.imgUrl}
					className="h-8 w-8 rounded-full"
					alt=""
				/>
				{chatSocket.notifications > 0 && (
					<div className="font-bold bf-red w-4 h-4 absolute -bottom-1 -right-1 bg-red rounded-full text-xs text-white flex items-center justify-center">
						{/* {chatSocket.notifications} */}
					</div>
				)}
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

	// const location = useLocation();

	useEffect(() => {
		if (chatSocket.clientSocket) {
			chatSocket.clientSocket.on("receivedMessage", (message: any) => {
				if (location.pathname !== "/chat") {
					dispatch(addNotification());
				}
			});
		}
	}, [chatSocket.clientSocket]);

	return (
		<>
			<LiveMatchesPopup open={openLivematches} setOpen={setOpenLivematches} />
			{OptionsLinks}
			{openMobileLinks && OptionsLinksMobile}
			{!openMobileLinks ? (
				<div className="relative lg:hidden">
					<MenuIcon
						className="fill-white cursor-pointer"
						onClick={onOpenMobileLinks}
					/>
					{chatSocket.notifications > 0 && (
						<div className="font-bold bf-red w-4 h-4 absolute -bottom-1 right-0 bg-red rounded-full text-xs text-white flex items-center justify-center">
							{/* {chatSocket.notifications} */}
						</div>
					)}
				</div>
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
