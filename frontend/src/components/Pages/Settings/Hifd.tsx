const Hifd:React.FC<{
	onHifdHandler: () => void;
}> = ({
	onHifdHandler
}) => {
	return (
		<button onClick={onHifdHandler} className="container h-60 p-x-20 rounded-lg font-extrabold text-8xl text-white bg-green">{"حِفظ"}</button>
	);
}

export default Hifd;