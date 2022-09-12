import yarroubi from '../../assets/teamPictures/yarroubi.png'
import twelvePic from '../../assets/teamPictures/aait-hmi.png'
import kbenlyaz from '../../assets/teamPictures/kbenlyaz.png'
import ibaali from '../../assets/teamPictures/ibaali.png'
import { ReactComponent as TwitterLogo } from "../../assets/icons/TwitterLogo.svg";
import { ReactComponent as GithubLogo } from "../../assets/icons/GithubLogo.svg";
import { ReactComponent as WebsiteLogo } from "../../assets/icons/WebsiteLogo.svg";


const TeamSection = () => {
	return (
		<div className="mb-10">
			<h2 className="text-white font-bold text-2xl text-center py-8">Team</h2>
			<div className='flex justify-center gap-16'>
				<div className='flex flex-col items-center gap-2'>
					<img src={yarroubi} alt="Younes Arroubi" className='h-24 w-24' />
					<p className='text-white text-base font-medium text-center'>Younes arroubi</p>
					<div className="flex gap-4">
						<a href='https://twitter.com/AbdelaliAithmid' target="_blank"><TwitterLogo  className="h-8"/></a>
						<a href='https://twitter.com/AbdelaliAithmid' target="_blank"><GithubLogo className="h-8" /></a>
						<a href='https://twitter.com/AbdelaliAithmid' target="_blank"><WebsiteLogo className="h-8" /></a>
					</div>
				</div>

				<div className='flex flex-col items-center gap-2'>
					<img src={twelvePic} alt="abdelali ait hmid" className='h-24 w-24' />
					<p className='text-white text-base font-medium text-center'>Abdelali ait hmid</p>
					<div className="flex gap-4">
						<a href='https://twitter.com/AbdelaliAithmid' target="_blank"><TwitterLogo  className="h-8" /></a>
						<a href='https://twitter.com/AbdelaliAithmid' target="_blank"><GithubLogo  className="h-8" /></a>
						<a href='https://twitter.com/AbdelaliAithmid' target="_blank"><WebsiteLogo className="h-8"  /></a>
					</div>
				</div>


				<div className='flex flex-col items-center gap-2'>
					<img src={kbenlyaz} alt="Khalid benlyazid" className='h-24 w-24' />
					<p className='text-white text-base font-medium text-center'>Khalid benlyazid</p>
					<div className="flex gap-4">
						<a href='https://twitter.com/AbdelaliAithmid' target="_blank"><TwitterLogo className="h-8"  /></a>
						<a href='https://twitter.com/AbdelaliAithmid' target="_blank"><GithubLogo  className="h-8" /></a>
						<a href='https://twitter.com/AbdelaliAithmid' target="_blank"><WebsiteLogo className="h-8"  /></a>
					</div>
				</div>


				<div className='flex flex-col items-center gap-2'>
					<img src={ibaali} alt="Imran baali" className='h-24 w-24' />
					<p className='text-white text-base font-medium text-center'>Imran baali</p>
					<div className="flex gap-4">
						<a href='https://twitter.com/AbdelaliAithmid' target="_blank"><TwitterLogo className="h-8"  /></a>
						<a href='https://twitter.com/AbdelaliAithmid' target="_blank"><GithubLogo  className="h-8" /></a>
						<a href='https://twitter.com/AbdelaliAithmid' target="_blank"><WebsiteLogo  className="h-8" /></a>
					</div>
				</div>


			</div>
		</div>
	);
};

export default TeamSection;
