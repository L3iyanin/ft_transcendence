import Option from './Option'
import { ReactComponent as Avatar } from "../../assets/icons/TestAvatar.svg";
import { useTranslation } from 'react-i18next';


const Links = () => {

	const { t } = useTranslation();

	return (
		<div className="container h-16 w-auto mx-0 flex justify-center items-center gap-7 grow-1">
			<nav className="container h-12 flex justify-end items-center gap-5">
				<Option url="/game">{t('home')}</Option>
				<Option url="/profile">{t('profile')}</Option>
				<Option url="/settings">{t('settings')}</Option>
				<Option url="/chat">{t('chat')}</Option>
				<Option url="/">{t('logout')}</Option>
			</nav>
			<div className="container flex items-center grow-0">
				<Avatar className="h-8"/>
			</div>
		</div>
	);
}

export default Links;