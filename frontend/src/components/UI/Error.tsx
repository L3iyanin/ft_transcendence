import { toast } from "react-toastify";

const ErrorAlert = (res: any) => {
	toast.error(res.message, {
		position: toast.POSITION.TOP_CENTER,
	});
}

export default ErrorAlert;