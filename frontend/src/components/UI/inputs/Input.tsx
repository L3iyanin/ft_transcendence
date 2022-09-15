

const Input:React.FC<{
	type: string;
	className?: string;
	placeholder?: string;
}> = ({ placeholder, type, className }) => {
	return (
		<input className={`bg-dark-blue rounded-lg py-4 pl-5 w-full text-grey-2 focus:outline-none ${className}`} type={type} placeholder={placeholder} />
	);
}

export default Input;