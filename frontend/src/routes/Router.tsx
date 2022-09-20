import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Landing from "../pages/Landing";
import Game from "../pages/Game";
import Chat from "../pages/Chat";
import Home from "../pages/Home";
import ChannelSettings from "../pages/ChannelSettings";
import RequireAuth from "./RequireAuth";
import NotRequireAuth from "./NotRequireAuth";
import InitSocketLayout from "../components/Layout/InitSocketLayout";

const Router: React.FC = () => {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route element={<RequireAuth />}>
						<Route path="/chat" element={<Chat />} />
						<Route
							path="/:channelId/channel-settings"
							element={<ChannelSettings />}
						/>
						<Route path="/game" element={<Game />} />
					</Route>
					<Route element={<NotRequireAuth />}>
						<Route path="/home" element={<Home />} />
						<Route path="/" element={<Landing />} />
					</Route>
					<Route path="*" element={<Navigate to="/" replace />} />
				</Routes>
			</BrowserRouter>
		</>
	);
};

export default Router;
