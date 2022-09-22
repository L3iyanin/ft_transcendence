

const Input:React.FC<{
	type: string;
	className?: string;
	placeholder?: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	value?: string;
}> = ({ placeholder, type, className, onChange, value }) => {
	return (
		<input value={value} onChange={onChange} className={`bg-dark-blue rounded-lg py-4 pl-5 w-full text-grey-2 focus:outline-none ${className}`} type={type} placeholder={placeholder} />
	);
}

export default Input;