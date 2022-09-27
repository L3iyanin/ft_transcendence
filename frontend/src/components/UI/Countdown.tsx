import Countdown from "react-countdown";

const CouterSection:React.FC<{
	label: string;
	count: number;
}> = (props) => {
	return (
		<div>
			<h6 className="">{props.label}</h6>
			<p className="text-center font-bold">{props.count < 10 ? "0" + props.count : props.count}</p>
		</div>
	);
};

const Counterdown:React.FC<{
	date: Date
	onComplete: () => void
}> = (props) => {
	return (
		<Countdown
			date={props.date}
			intervalDelay={0}
			precision={3}
			onComplete={props.onComplete}
			renderer={(props) => (
				<div className="flex gap-4">
					{/* <CouterSection label="Days" count={props.days} /> */}
					<CouterSection label="Hours" count={props.hours} />
					<CouterSection label="Minutes" count={props.minutes} />
					<CouterSection label="Seconds" count={props.seconds} />
				</div>
			)}
		/>
	);
};

export default Counterdown;
