import { ReactComponent as Arcade } from "../../assets/icons/Arcade.svg";
import { ReactComponent as Logo } from "../../assets/icons/pong-3yan.svg";

const TopSection = () => {
	return (
		<div className="flex justify-center gap-12 p-8">
			<div className="h-96 flex flex-col">
				<Logo className="max-h-full" />
				<button className="text-white p-4 m-4 bg-red rounded-xl">
					Sign in with 42
				</button>
			</div>
			<div className="h-96">
				<Arcade className="max-h-full" />
			</div>
		</div>
	);
};

export default TopSection;
