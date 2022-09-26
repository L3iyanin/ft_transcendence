import "./LoadingSpinner.scss";

const LoadingSpinner: React.FC = () => {
	return (
		<div className="lds-ripple">
			<div></div>
			<div></div>
		</div>
	);
};

export default LoadingSpinner;
