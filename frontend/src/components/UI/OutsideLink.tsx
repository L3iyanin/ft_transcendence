

const OutsideLink:React.FC<{
	to: string;
	children: string | JSX.Element | JSX.Element[];
	className?: string;
}> = (props) => {
	const { to, children, className } = props;
	return (
		<a href={to} target="_blank" rel="noopener noreferrer" className={className}>
			{children}
		</a>
	);
}

export default OutsideLink;