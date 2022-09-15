

const InputWithIcon: React.FC<{
	type: string;
	placeholder?: string;
	icon: JSX.Element;
}> = ({type, placeholder, icon }) => {
	return (
		<div className="bg-dark-60 flex rounded-2xl px-5 py-3 text-lg items-center">
			<input className="bg-transparent" type={type} placeholder={placeholder} />
			{icon}
		</div>
	);
};

export default InputWithIcon;