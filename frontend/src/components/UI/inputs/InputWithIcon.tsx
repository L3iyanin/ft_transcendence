const InputWithIcon: React.FC<{
	type: string;
	placeholder?: string;
	icon: JSX.Element;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ type, placeholder, icon, onChange }) => {
	return (
		<div className="bg-dark-60 flex rounded-2xl px-5 py-3 text-lg items-center">
			<input
				className="focus:outline-none text-grey-2 bg-transparent grow"
				type={type}
				placeholder={placeholder}
				onChange={onChange}
			/>
			{icon}
		</div>
	);
};

export default InputWithIcon;
