import { useTranslation } from 'react-i18next';
import TeamCard from './TeamCard';

const TeamSection = () => {

	const { t } = useTranslation();

	const teamMembers: ITeam[] = [
		{
			imageUrl: "/imgs/team/yarroubi.png",
			fullName: t("landingPage.teamMateOne"),
			twitterLink: '',
			githubLink: '',
			websiteLink: '',
		},
		{
			imageUrl: "/imgs/team/aait-hmi.png",
			fullName: t("landingPage.teamMateTwo"),
			twitterLink: '',
			githubLink: '',
			websiteLink: '',
		},
		{
			imageUrl: "/imgs/team/kbenlyaz.png",
			fullName: t("landingPage.teamMateThree"),
			twitterLink: '',
			githubLink: '',
			websiteLink: '',
		},
		{
			imageUrl: "/imgs/team/ibaali.png",
			fullName: t("landingPage.teamMateFour"),
			twitterLink: 'https://twitter.com/kirwaKO',
			githubLink: 'https://github.com/kirwa-KO',
			websiteLink: 'https://kirwako.com/',
		}
	];

	return (
		<div className="mb-10">
			<h2 className="text-white font-bold text-2xl text-center py-8">{t("team")}</h2>
			<div className='flex justify-center gap-16'>
				{teamMembers.map((member, index) => (
					<TeamCard
						key={index}
						fullName={member.fullName}
						imageUrl={member.imageUrl}
						githubLink={member.githubLink}
						twitterLink={member.twitterLink}
						websiteLink={member.websiteLink}
					/>
				))}
			</div>
		</div>
	);
};

export default TeamSection;
