

const RoundedHr: React.FC<{
	className?: string;
}> = ({ className }) => {
	return <hr className={`my-4 border-dark-blue border-2 rounded ${className}`} />;
}

export default RoundedHr;