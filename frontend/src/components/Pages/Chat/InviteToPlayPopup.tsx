import { useTranslation } from "react-i18next";
import Modal from "../../UI/Modals/Modal";
import { MatchTypeEnum } from "../../../utils/constants/enum";
import GameMode from "../Home/GameMode/GameMode";

const InviteToPlayPopup: React.FC<{
	open: boolean;
	setOpen: (open: boolean) => void;
	onRefreshHandler?: () => void;
	onInvitePlayer: (scoreToWin: number) => void;
}> = ({ open, setOpen, onRefreshHandler, onInvitePlayer }) => {


	const onInviteHandler = (scoreToWin: number) => {
		onInvitePlayer(scoreToWin);
		setOpen(false);
	};

	return (
		<Modal open={open} setOpen={setOpen}>
			<div className="flex flex-col gap-5 py-6 px-8">
				<GameMode isForInvite={true} mode={MatchTypeEnum.Classic} onPlay={onInviteHandler} />
				<GameMode isForInvite={true} mode={MatchTypeEnum.Vip}  onPlay={onInviteHandler} />
			</div>
		</Modal>
	);
};

export default InviteToPlayPopup;
