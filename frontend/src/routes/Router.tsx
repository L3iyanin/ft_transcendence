import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Landing from "../pages/Landing";
import Game from "../pages/Game";
import NavBar from "../components/NavBar/NavBar";
import Profile from "../pages/Profile";
import Settings from "../pages/Settings";
import Chat from "../pages/Chat";
import Home from "../pages/Home";
import ChannelSettings from "../pages/ChannelSettings";
import RequireAuth from "./RequireAuth";
import NotRequireAuth from "./NotRequireAuth";

const Router: React.FC = () => {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route element={<RequireAuth />}>
						<Route path="/profile" element={<Profile />} />
						<Route path="/settings" element={<Settings />} />
						<Route path="/chat" element={<Chat />} />
						<Route
							path="/:channelId/channel-settings"
							element={<ChannelSettings />}
						/>
						<Route path="/game" element={<Game />} />
						<Route path="/home" element={<Home />} />
					</Route>
					<Route element={<NotRequireAuth />}>
						<Route path="/" element={<Landing />} />
					</Route>
					<Route path="*" element={<Navigate to="/" replace />} />
				</Routes>
			</BrowserRouter>
		</>
	);
};

export default Router;
