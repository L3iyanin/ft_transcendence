import { useTranslation } from "react-i18next";
import { MatchTypeEnum } from "../../../../utils/constants/enum";
import ModeDescription from "./ModeDescription";

const GameMode: React.FC<{
	mode: MatchTypeEnum
	onPlay: (scoreToWin: number) => void
	isForInvite?: boolean
}> = ({ mode, onPlay, isForInvite }) => {
	const { t } = useTranslation();

	const onPlayHandler = () =>{
		onPlay(mode);
	}

	const isForClassic = mode === MatchTypeEnum.Classic;

	return (
		<section className="flex flex-col basis-full xl:basis-1/2 justify-center items-center mb-10 xl:mb-0">
			<ModeDescription mode={mode} />
			<article
				className={`relative xl:w-4/5 w-full px-1 flex justify-between items-center rounded-lg border-4 bg-opacity-20 ${ isForClassic ? "border-red" : "border-yellow"}`}
				style={{
					backgroundImage:
						isForClassic
							? "url(/imgs/backgrounds/marineford-bg.png)"
							: "url(/imgs/backgrounds/wano.png)",
					aspectRatio: "16 / 9",
					backgroundSize: "cover",
				}}
			>
				<div className="w-[9px] h-[78px] mt-2 rounded-sm bg-white self-start"></div>
				<div className="w-0 h-full border border-dashed border-white"></div>
				<div className="w-[9px] h-[78px] mb-2 rounded-sm bg-white self-end"></div>

				<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
					<div className="w-[14px] h-[14px] rounded-full relative left-3/4 bg-white"></div>
					<button onClick={onPlayHandler} className={`px-20 py-4 rounded-xl text-xl font-bold text-center  ${ isForClassic ? "bg-red text-white" : "bg-yellow text-dark-60"}`}>
						 { !isForInvite && t("homePage.Play")}
						 { isForInvite && t("invite")}
					</button>
				</div>
			</article>
		</section>
	);
};

export default GameMode;
