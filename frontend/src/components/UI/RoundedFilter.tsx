import { useState } from "react";

const RoundedFilter: React.FC<{
	firstLabel: string;
	secondLabel: string;
	whoIsActive: 1 | 2;
}> = ({ firstLabel, secondLabel, whoIsActive }) => {

	const [activeFilter, setActiveFilter] = useState(whoIsActive);

	const onSelectFirstLabel = () => {
		setActiveFilter(1);
	}

	const onSelectSecondLabel = () => {
		setActiveFilter(2);
	}


	return (
		<div className="flex justify-between text-center font-bold border-2 rounded-2xl">
			<div onClick={onSelectFirstLabel} className={`cursor-pointer basis-1/2 py-2 ${activeFilter === 1 ? "text-dark-60 bg-white rounded-l-xl" : ""}`}>{firstLabel}</div>
			<div onClick={onSelectSecondLabel} className={`cursor-pointer basis-1/2 py-2 ${activeFilter === 2 ? "text-dark-60 bg-white rounded-r-xl" : ""}`}>{secondLabel}</div>
		</div>
	);
}

export default RoundedFilter;