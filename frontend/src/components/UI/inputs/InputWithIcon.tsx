import React from "react";

const InputWithIcon = React.forwardRef<
	HTMLInputElement,
	{
		type: string;
		placeholder?: string;
		icon: JSX.Element;
		onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	}
>((props, ref) => {
	const { type, placeholder, icon, onChange } = props;
	return (
		<div className="bg-dark-60 flex rounded-2xl px-5 py-3 text-lg items-center">
			<input
				className="focus:outline-none text-grey-2 bg-transparent grow"
				type={type}
				placeholder={placeholder}
				onChange={onChange}
				ref={ref}
			/>
			{icon}
		</div>
	);
});

export default InputWithIcon;
