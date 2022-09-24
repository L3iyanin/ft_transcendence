import { ReactComponent as WinIcon } from "../../assets/icons/win.svg";
import { ReactComponent as LoseIcon } from "../../assets/icons/lose.svg";

const Stat: React.FC < {stat : string, qty : number} > = (props) => {
	return (
		<div className="flex items-center gap-2">
			{props.stat === "wins" ? <WinIcon /> : <LoseIcon />}
			<span className="text-base font-medium">{`${props.qty} ${props.stat}`}</span>
		</div>
	);
}

export default Stat;
