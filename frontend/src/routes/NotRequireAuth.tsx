import { useSelector } from "react-redux";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import Loading from "../components/UI/Loading";

function NotRequireAuth({ children }: { children?: JSX.Element }) {
	const userData: IUserState = useSelector((state: any) => state.user);
	let location = useLocation();

	if (userData.isLoading) return <Loading />;

	if (userData.isLoggedIn) {
		return <Navigate to="/chat" state={{ from: location }} replace />;
	}

	if (children) {
		return children;
	}

	return <Outlet />;
}

export default NotRequireAuth;