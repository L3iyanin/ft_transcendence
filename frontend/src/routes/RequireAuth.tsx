import { useSelector } from "react-redux";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import InitSocketLayout from "../components/Layout/InitSocketLayout";
import Loading from "../components/UI/Loading";

function RequireAuth({ children }: { children?: JSX.Element }) {
	const userData: IUserState = useSelector((state: any) => state.user);
	let location = useLocation();

	if (userData.isLoading) return <Loading />;

	if (!userData.isLoggedIn) {
		return <Navigate to="/" state={{ from: location }} replace />;
	}

	if (children) {
		return <InitSocketLayout>{children}</InitSocketLayout>;
	}

	return (
		<InitSocketLayout>
			<Outlet />
		</InitSocketLayout>
	);
}

export default RequireAuth;
