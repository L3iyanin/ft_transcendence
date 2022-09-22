import { toast } from "react-toastify";

const ErrorAlert = (res: any) => {
	toast.error(res.message, {
		position: toast.POSITION.TOP_CENTER,
	});
}

export const ErrorAlertWithMessage = (message: string) => {
	toast.error(message, {
		position: toast.POSITION.TOP_CENTER,
	});
}

export default ErrorAlert;