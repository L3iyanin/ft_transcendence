import { ReactComponent as Live } from "../../assets/icons/Live.svg"

const SeeLive = () => {
	return (
		<div className="container flex justify-end items-center gap-1">
			<p className="text-xxs text-yellow">See match live</p>
			<Live className="h-4"/>
		</div>
	);
}

export default SeeLive;