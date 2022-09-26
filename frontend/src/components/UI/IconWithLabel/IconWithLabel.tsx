import { useNavigate } from "react-router-dom";

const IconWithLabel: React.FC<{
	icon: JSX.Element;
	label: string;
	linkToGo?: string;
	labelStyle?: string;
}> = ({ icon, label, linkToGo, labelStyle }) => {
	const navigate = useNavigate();

	const handlePlayerClick = () => {
		if (linkToGo) {
			navigate(linkToGo);
		}
	};
	return (
		<div className={`flex gap-2 items-center ${linkToGo ? "cursor-pointer" : ""}`} onClick={handlePlayerClick}>
			{icon}
			<div className={`text-base ${labelStyle}`}>{label}</div>
		</div>
	);
}

export default IconWithLabel;