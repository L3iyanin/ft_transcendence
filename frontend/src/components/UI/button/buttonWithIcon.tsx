import { ReactComponent as ChevronDownIcon } from "../../../assets/icons/chevronDown.svg";

import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";

const ButtonWithIcon: React.FC<{
	icon: JSX.Element;
	text: string;
	dropDown: boolean;
	options?: string[];
}> = (props) => {
	return (
		<div className="flex items-center px-5 py-3 text-lg bg-dark-60 rounded-2xl gap-1">
			<Menu as="div" className="relative inline-block text-left">
				<div>
					<Menu.Button className="flex flex-row items-center gap-2 w-full justify-center rounded-md border border-dark-60 hover:border-white bg-dark-60 px-4 py-2  focus:outline-none">
						{props.icon}
						<p className="text-white font-medium text-sm">
							{props.text}
						</p>

						{props.dropDown && <ChevronDownIcon
							className="h-4 w-4"
							aria-hidden="true"
						/>}
					</Menu.Button>
				</div>

				{props.dropDown && props.options && <Transition
					as={Fragment}
					enter="transition ease-out duration-100"
					enterFrom="transform opacity-0 scale-95"
					enterTo="transform opacity-100 scale-100"
					leave="transition ease-in duration-75"
					leaveFrom="transform opacity-100 scale-100"
					leaveTo="transform opacity-0 scale-95"
				>
					<Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-dark-60 shadow-lg ring-1 ring-white focus:outline-none">
						<div className="p-2">
							{props.options.map((option, index) => {
								return (
									<div
										className="hover:text-dark-grey cursor-pointer	"
										key={index}
									>
										<Menu.Item>
											<p className="p-1 mx-4">{option}</p>
										</Menu.Item>
										{index + 1 < props.options.length && (
											<hr className="mx-4 bg-dark-blue"></hr>
										)}
									</div>
								);
							})}
						</div>
					</Menu.Items>
				</Transition>}
			</Menu>
		</div>
	);
};

export default ButtonWithIcon;
