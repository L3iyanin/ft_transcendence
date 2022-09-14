import { ReactComponent as TwitterLogo } from "../../assets/icons/TwitterLogo.svg";
import { ReactComponent as GithubLogo } from "../../assets/icons/GithubLogo.svg";
import { ReactComponent as WebsiteLogo } from "../../assets/icons/WebsiteLogo.svg";
import OutsideLink from "../UI/OutsideLink";

const TeamCard: React.FC<{
	imageUrl: string;
	fullName: string;
	twitterLink: string;
	githubLink: string;
	websiteLink: string;
}> = ({
	imageUrl,
	fullName,
	twitterLink,
	githubLink,
	websiteLink,
}) => {
	return (
		<div className='flex flex-col items-center gap-2'>
			<img src={imageUrl} alt={fullName} className='h-24 w-24' />
			<p className='text-white text-base font-medium text-center capitalize'>{fullName}</p>
			<div className="flex gap-4">
				<OutsideLink to={twitterLink}><TwitterLogo  className="h-8"/></OutsideLink>
				<OutsideLink to={githubLink}><GithubLogo className="h-8" /></OutsideLink>
				<OutsideLink to={websiteLink}><WebsiteLogo className="h-8" /></OutsideLink>
			</div>
		</div>
	);
}

export default TeamCard;