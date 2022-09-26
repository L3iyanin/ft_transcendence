import Option from './Option'
import { ReactComponent as Avatar } from "../../assets/icons/TestAvatar.svg";
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { logout, setMatching } from '../../reducers/UserSlice';
import { useNavigate } from 'react-router-dom';
import { Socket } from 'socket.io-client';


const Links = () => {

	const { t } = useTranslation();

	const dispatch = useDispatch();

	const navigate = useNavigate();

	const clientSocket: Socket = useSelector(
		(state: any) => state.chat.clientSocket
	);

	const userData = useSelector((state: any) => state.user);

	const onLogout = () => {
		dispatch(logout());
		navigate('/');
	};

	const playGame = () => {
		dispatch(setMatching());
		const scoreToWin = 3
		console.log('=== playGame ===');
		console.log(userData.user.id);
		console.log(scoreToWin);
		console.log('================');
		clientSocket.emit('joinGame', {
			userId: userData.user.id,
			scoreToWin: scoreToWin,
		});
	};


	return (
		<div className="container h-16 w-auto mx-0 flex justify-center items-center gap-7 grow-1">
			<nav className="container h-12 flex justify-end items-center gap-5">

				<span onClick={playGame} className="cursor-pointer text-center text-base text-white font-medium">{t('play')}</span>

				<Option url="/game">{t('home')}</Option>
				<Option url="/profile">{t('profile')}</Option>
				<Option url="/settings">{t('settings')}</Option>
				<Option url="/chat">{t('chat')}</Option>
				<Option url="/search">{t('search')}</Option>
				<span onClick={onLogout} className="cursor-pointer text-center text-base text-white font-medium">{t('logout')}</span>

			</nav>
			<div className="container flex items-center grow-0">
				{/* <Avatar className="h-8"/> */}
				<img src={userData.user.imgUrl} className="h-8 w-8 rounded-full" alt="" />
			</div>
		</div>
	);
}

export default Links;