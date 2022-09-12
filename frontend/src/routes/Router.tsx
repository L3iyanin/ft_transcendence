import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Landing from "../pages/Landing";
import Game from "../pages/Game";
import NavBar from "../components/NavBar/NavBar";

const Router: React.FC = () => {
	return (
		<>
			<BrowserRouter>
				<NavBar/>
				<Routes>
					<Route path="/game" element={<Game />} />
					<Route path="/" element={<Landing />} />
					<Route path="*" element={<Navigate to="/" replace />} />
				</Routes>
			</BrowserRouter>
		</>
	);
};

export default Router;