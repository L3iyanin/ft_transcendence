import { useTranslation } from "react-i18next";
import { MatchTypeEnum } from "../../../../utils/constants/enum";

const GameMode: React.FC<{ mode: MatchTypeEnum }> = ({ mode }) => {
	const { t } = useTranslation();

	return (
		<section className="container mx-2 my-6 flex flex-col justify-center items-center gap-2">
			<h2 className="text-xl font-bold text-white">
				{mode === MatchTypeEnum.Classic
					? t("Marineford Pong")
					: t("Wano Pong")}
			</h2>
			<h3 className="text-base text-beige">{`${mode} ${t(
				"Goals to win"
			)}`}</h3>

			<article
				className={`container relative w-[513px] h-[288px] flex justify-between items-center rounded-lg border-4 border-red bg-opacity-20`}
				style={{
					backgroundImage: mode === MatchTypeEnum.Classic
							? "url(/imgs/backgrounds/marineford-bg.png)"
							: "url(/imgs/backgrounds/wano.png)",
					aspectRatio: "16 / 9",
					backgroundSize: "cover",
				}}
			>
				<div className="w-[9px] h-[78px] m-1 rounded-sm bg-beige self-start"></div>
				<div className="w-0 h-full border border-dashed border-beige"></div>
				<div className="w-[9px] h-[78px] m-1 rounded-sm bg-beige self-end"></div>

				<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
					<div className="w-[14px] h-[14px] rounded-full relative left-3/4 bg-beige"></div>
					<button className="px-20 py-2 rounded-lg bg-red text-sm text-white text-center">
						{t("Play")}
					</button>
				</div>
			</article>
		</section>
	);
};

export default GameMode;