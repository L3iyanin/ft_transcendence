import { useState } from "react";
import { ChatOptionsEnum } from "../../utils/constants/enum";

const RoundedFilter: React.FC<{
	firstLabel: string;
	secondLabel: string;
	activeOption: ChatOptionsEnum;
	onSelectFirstLabel: () => void;
	onSelectSecondLabel: () => void;
}> = ({ firstLabel, secondLabel, activeOption, onSelectFirstLabel, onSelectSecondLabel }) => {

	return (
		<div className="flex justify-between text-center font-bold border-2 rounded-2xl">
			<div onClick={onSelectFirstLabel} className={`cursor-pointer basis-1/2 py-2 ${activeOption === ChatOptionsEnum.DMS ? "text-dark-60 bg-white rounded-l-xl" : ""}`}>{firstLabel}</div>
			<div onClick={onSelectSecondLabel} className={`cursor-pointer basis-1/2 py-2 ${activeOption === ChatOptionsEnum.CHANNELS ? "text-dark-60 bg-white rounded-r-xl" : ""}`}>{secondLabel}</div>
		</div>
	);
}

export default RoundedFilter;