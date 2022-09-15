import { useTranslation } from "react-i18next";

const Achievement = ({name, description, imgUrl, achieved} : IAchievement) => {
	const { t } = useTranslation();
	return (
		<article>
			<img src={imgUrl} alt={name + ": achievement image"} />
			<h4></h4>
		</article>
	);
}

export default Achievement;