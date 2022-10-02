import { useTranslation } from "react-i18next";
import Input from "../../UI/inputs/Input";
import Modal from "../../UI/Modals/Modal";
import ButtonWithIcon from "../../UI/Buttons/ButtonWithIcon";
import { useState } from "react";
import ErrorAlert from "../../UI/Error";
import LoadingSpinner from "../../UI/Loading/LoadingSpinner";
import { send2FASecret } from "../../../services/auth/TwoFA";
import { toast } from "react-toastify";
import { login } from "../../../reducers/UserSlice";
import { useDispatch } from "react-redux";

const TwoFAPopup: React.FC<{
	userId: string | null;
	open: boolean;
	setOpen: (open: boolean) => void;
}> = ({ open, setOpen, userId }) => {

	const { t } = useTranslation();

	const [TwoFA, setTwoFA] = useState<string>("");

	const dispatch = useDispatch();

	const send2FASecretHandler = () => {

		send2FASecret(TwoFA, userId!)
		.then((res) => {
				setOpen(false);
				// SuccesAlert(res.message);
				dispatch(login(res.data.data));
				toast.success(t("signInSuccess"), {
					position: toast.POSITION.TOP_CENTER,
				});
			})
			.catch((err) => {
				console.error(err);
				ErrorAlert(err);
			});
	};

	const onChangeTwoFAHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTwoFA(e.target.value);
	};

	if (open == true && userId === null) {
		return <LoadingSpinner />;
	}

	return (
		<Modal open={open} setOpen={setOpen}>
			<div className="flex flex-col gap-5">
				<h3 className="font-bold text-xl">{t("landingPage.needTwoFA")}</h3>
				<Input value={TwoFA} onChange={onChangeTwoFAHandler} type="text" placeholder={t("landingPage.needTwoFA")} />
				
				<ButtonWithIcon onClick={send2FASecretHandler} className="bg-green justify-center" label={t("landingPage.sendTwoFA")} />
			</div>
		</Modal>
	);
};

export default TwoFAPopup;