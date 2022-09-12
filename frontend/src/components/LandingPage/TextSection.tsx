import React from "react";
import { ReactComponent as Css3Logo } from "../../assets/icons/Css3Logo.svg";
import { ReactComponent as FigmaLogo } from "../../assets/icons/FigmaLogo.svg";
import { ReactComponent as Html5Logo } from "../../assets/icons/Html5Logo.svg";
import { ReactComponent as NestjsLogo } from "../../assets/icons/NestjsLogo.svg";
import { ReactComponent as PostgresqlLogo } from "../../assets/icons/PostgresqlLogo.svg";
import { ReactComponent as ReactLogo } from "../../assets/icons/ReactLogo.svg";
import { ReactComponent as SocketioLogo } from "../../assets/icons/SocketioLogo.svg";
import { ReactComponent as TypescriptLogo } from "../../assets/icons/TypescriptLogo.svg";


const TextSection = () => {
	return (
		<div className="max-w-3xl m-auto">
			<hr className="bg-white mt-8 py-[1px]" />
			<h2 className="text-white font-bold text-2xl text-center py-8">About</h2>
			<p className="text-white">
				Ft_transcendence is the last project in the commen core of 1337
				School (42Network). <br />
				It's a Pong Multiplayer Game.
			</p>
			<h2 className="text-white font-bold text-2xl text-center py-8">Main Features</h2>
			<p className="text-white">The Project Contains:</p>
			<ul className="list-disc text-white pl-8">
				<li>Pong Multiplayer Online Game</li>
				<li>Direct and group chat (with diffrent permissions and configs)</li>
				<li>Profile that contains: achivments and stats</li>
			</ul>
			<h2 className="text-white font-bold text-2xl text-center py-8">Technologies Used</h2>
			<div className="flex gap-4">
				<SocketioLogo />
				<FigmaLogo />
				<ReactLogo />
				<Css3Logo />
				<Html5Logo />
				<NestjsLogo />
				<TypescriptLogo />
				<PostgresqlLogo />
			</div>
			<hr className="bg-white mt-8 py-[1px]" />
		</div>
	);
};

export default TextSection;
