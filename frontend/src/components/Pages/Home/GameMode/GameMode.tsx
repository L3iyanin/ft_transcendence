import { useTranslation } from "react-i18next";
import { MatchTypeEnum } from "../../../../utils/constants/enum";
import ModeDescription from "./ModeDescription";

const GameMode: React.FC<{
	mode: MatchTypeEnum
	onPlay: (scoreToWin: number) => void
}> = ({ mode, onPlay }) => {
	const { t } = useTranslation();

	const onPlayHandler = () =>{
		onPlay(mode);
	}

	return (
		<section className="flex flex-col justify-center items-center gap-4">
			<ModeDescription mode={mode} />
			<article
				className={`relative w-[513px] h-[288px] px-1 flex justify-between items-center rounded-lg border-4 border-red bg-opacity-20`}
				style={{
					backgroundImage:
						mode === MatchTypeEnum.Classic
							? "url(/imgs/backgrounds/marineford-bg.png)"
							: "url(/imgs/backgrounds/wano.png)",
					aspectRatio: "16 / 9",
					backgroundSize: "cover",
				}}
			>
				<div className="w-[9px] h-[78px] mt-2 rounded-sm bg-beige self-start"></div>
				<div className="w-0 h-full border border-dashed border-beige"></div>
				<div className="w-[9px] h-[78px] mb-2 rounded-sm bg-beige self-end"></div>

				<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
					<div className="w-[14px] h-[14px] rounded-full relative left-3/4 bg-beige"></div>
					<button onClick={onPlayHandler} className="px-20 py-4 rounded-xl bg-red text-xl font-bold text-white text-center">
						{t("homePage.Play")}
					</button>
				</div>
			</article>
		</section>
	);
};

export default GameMode;
