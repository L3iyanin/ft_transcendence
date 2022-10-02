

const ButtonWithIcon:React.FC<{
	icon?: JSX.Element,
	label: string,
	labelStyle?: string,
	iconOnRight?: boolean,
	className?: string,
	isDisabled?: boolean,
	onClick?: () => void
}> = ({
	icon,
	label,
	iconOnRight,
	className,
	labelStyle,
	isDisabled,
	onClick
}) => {
	return (
		<button disabled={isDisabled} onClick={onClick} className={`${className} flex items-center gap-2 py-4 px-6 rounded-2xl`}>
			{!iconOnRight && icon}
			<span className={`${labelStyle}`}>{label}</span>
			{iconOnRight&& icon}
		</button>
	);
}

export default ButtonWithIcon;