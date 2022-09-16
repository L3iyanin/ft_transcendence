import { useTranslation } from "react-i18next";
import Input from "../../UI/inputs/Input";
import Modal from "../../UI/Modals/Modal";
import ButtonWithIcon from "../../UI/Buttons/ButtonWithIcon";
import { useState } from "react";
import { ReactComponent as AddIcon } from "../../../assets/icons/add.svg";
import { ChannleStatusEnum } from "../../../utils/constants/enum";

const CreateChannelPopup: React.FC<{
	open: boolean;
	setOpen: (open: boolean) => void;
}> = ({ open, setOpen }) => {

	const { t } = useTranslation();

	const [selectedOption, setSelectedOption] = useState<ChannleStatusEnum>(ChannleStatusEnum.PUBLIC);

	const setPublicChannelHandler = () => {
		setSelectedOption(ChannleStatusEnum.PUBLIC);
	};
	
	const setProtectedChannelHandler = () => {
		setSelectedOption(ChannleStatusEnum.PROTECTED);
	};
	
	const setPrivateChannelHandler = () => {
		setSelectedOption(ChannleStatusEnum.PRIVATE);
	};

	return (
		<Modal open={open} setOpen={setOpen}>
			<div className="flex flex-col gap-5">
				<h3 className="font-bold text-xl">{t("chatPage.createChannel")}</h3>
				<Input type="text" placeholder={t("chatPage.channelName")} />
				<div className="flex gap-4 items-center">
					<span onClick={setPublicChannelHandler} className={`cursor-pointer border-2 py-1 px-4 rounded-full border-green ${selectedOption === ChannleStatusEnum.PUBLIC ? "bg-green" : ""}`}>
						{t("chatPage.channelType.public")}
					</span>
					<span onClick={setProtectedChannelHandler} className={`cursor-pointer border-2 py-1 px-4 rounded-full ${selectedOption === ChannleStatusEnum.PROTECTED ? "bg-white text-black" : "text-white"}`}>
						{t("chatPage.channelType.protected")}
					</span>
					<span onClick={setPrivateChannelHandler} className={`cursor-pointer border-2 py-1 px-4 rounded-full border-red ${selectedOption === ChannleStatusEnum.PRIVATE ? "bg-red" : ""}`}>
						{t("chatPage.channelType.private")}
					</span>
				</div>
				{ selectedOption === ChannleStatusEnum.PROTECTED && <Input type="password" placeholder={t("password")} /> }
				<ButtonWithIcon className="bg-green justify-center" label={t("chatPage.createChannel")} />
			</div>
		</Modal>
	);
};

export default CreateChannelPopup;