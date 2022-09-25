import { useTranslation } from "react-i18next";
import Input from "../../UI/inputs/Input";
import Modal from "../../UI/Modals/Modal";
import ButtonWithIcon from "../../UI/Buttons/ButtonWithIcon";
import { useState } from "react";
import { ReactComponent as AddIcon } from "../../../assets/icons/add.svg";
import { ChannleTypesEnum } from "../../../utils/constants/enum";
import { createChannel } from "../../../services/chat/chat";
import SuccesAlert from "../../UI/SuccesAlert";
import ErrorAlert, { ErrorAlertWithMessage } from "../../UI/Error";

const CreateChannelPopup: React.FC<{
	open: boolean;
	setOpen: (open: boolean) => void;
	onRefreshHandler: () => void;
}> = ({ open, setOpen, onRefreshHandler }) => {

	const { t } = useTranslation();

	const [channelName, setChannelName] = useState<string>("");

	const [error, setError] = useState<string>("");

	const [channelPassword, setChannelPassword] = useState("");

	const [selectedOption, setSelectedOption] = useState<ChannleTypesEnum>(ChannleTypesEnum.PUBLIC);

	const setPublicChannelHandler = () => {
		setSelectedOption(ChannleTypesEnum.PUBLIC);
	};
	
	const setProtectedChannelHandler = () => {
		setSelectedOption(ChannleTypesEnum.PROTECTED);
	};
	
	const setPrivateChannelHandler = () => {
		setSelectedOption(ChannleTypesEnum.PRIVATE);
	};

	const onCreateChannel = () => {
		if (channelName.length < 3) {
			setError(t("chatPage.channelNameError"));
			return;
		}
		if (selectedOption === ChannleTypesEnum.PROTECTED && channelPassword.length < 3) {
			setError(t("chatPage.channelPasswordError"));
			return;
		}
		createChannel(channelName, selectedOption, channelPassword)
		.then((res) => {
				setOpen(false);
				SuccesAlert(res.message);
				onRefreshHandler();
			})
			.catch((err) => {
				console.error(err);
				ErrorAlertWithMessage(err.response.data.message);
			});
	};

	const onChangeChannelNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setChannelName(e.target.value);
	};


	const onChangeChannelPasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setChannelPassword(e.target.value);
	};

	return (
		<Modal open={open} setOpen={setOpen}>
			<div className="flex flex-col gap-5">
				<h3 className="font-bold text-xl">{t("chatPage.createChannel")}</h3>
				<Input value={channelName} onChange={onChangeChannelNameHandler} type="text" placeholder={t("chatPage.channelName")} />
				<div className="flex gap-4 items-center">
					<span onClick={setPublicChannelHandler} className={`cursor-pointer border-2 py-1 px-4 rounded-full border-green ${selectedOption === ChannleTypesEnum.PUBLIC ? "bg-green" : ""}`}>
						{t("chatPage.channelType.public")}
					</span>
					<span onClick={setProtectedChannelHandler} className={`cursor-pointer border-2 py-1 px-4 rounded-full ${selectedOption === ChannleTypesEnum.PROTECTED ? "bg-white text-black" : "text-white"}`}>
						{t("chatPage.channelType.protected")}
					</span>
					<span onClick={setPrivateChannelHandler} className={`cursor-pointer border-2 py-1 px-4 rounded-full border-red ${selectedOption === ChannleTypesEnum.PRIVATE ? "bg-red" : ""}`}>
						{t("chatPage.channelType.private")}
					</span>
				</div>
				{ selectedOption === ChannleTypesEnum.PROTECTED && <Input value={channelPassword} onChange={onChangeChannelPasswordHandler} type="password" placeholder={t("password")} /> }
				{error && error.length > 0 && <div className="text-red font-bold">
					{error}
				</div>}
				<ButtonWithIcon onClick={onCreateChannel} className="bg-green justify-center" label={t("chatPage.createChannel")} />
			</div>
		</Modal>
	);
};

export default CreateChannelPopup;