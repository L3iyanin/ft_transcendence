import { toast } from "react-toastify";

const SuccesAlert = (message: string) => {
	toast.success(message, {
		position: toast.POSITION.TOP_CENTER,
	});
}

export default SuccesAlert;