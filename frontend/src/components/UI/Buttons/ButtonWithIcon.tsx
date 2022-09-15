

const ButtonWithIcon:React.FC<{
	icon: JSX.Element,
	label: string,
	labelStyle?: string,
	iconOnRight?: boolean,
	className?: string,
}> = ({
	icon,
	label,
	iconOnRight,
	className,
	labelStyle,
}) => {
	return (
		<button className={`${className} flex items-center gap-2 py-4 px-6 rounded-2xl`}>
			{!iconOnRight && icon}
			<span className={`${labelStyle}`}>{label}</span>
			{iconOnRight&& icon}
		</button>
	);
}

export default ButtonWithIcon;