import { ReactComponent as ChevronDownIcon } from "../../../assets/icons/chevronDown.svg";

import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";

const ButtonWithDropdown: React.FC<{
	icon: JSX.Element;
	text: string;
	dropDown: boolean;
	options?: string[];
}> = (props) => {
	return (
		<div className="flex items-center gap-1 px-5 py-3 text-lg bg-dark-60 rounded-2xl">
			<Menu as="div" className="relative inline-block text-left">
				<div>
					<Menu.Button className="flex flex-row items-center justify-center w-full gap-2 px-4 py-2 border rounded-md border-dark-60 hover:border-white bg-dark-60 focus:outline-none">
						{props.icon}
						<p className="text-sm font-medium text-white">
							{props.text}
						</p>

						{props.dropDown && (
							<ChevronDownIcon
								className="w-4 h-4"
								aria-hidden="true"
							/>
						)}
					</Menu.Button>
				</div>

				{props.dropDown && props.options && (
					<Transition
						as={Fragment}
						enter="transition ease-out duration-100"
						enterFrom="transform opacity-0 scale-95"
						enterTo="transform opacity-100 scale-100"
						leave="transition ease-in duration-75"
						leaveFrom="transform opacity-100 scale-100"
						leaveTo="transform opacity-0 scale-95"
					>
						<Menu.Items className="absolute right-0 z-10 w-56 mt-2 origin-top-right rounded-md shadow-lg bg-dark-60 ring-1 ring-white focus:outline-none">
							<div className="p-2">
								{props.options.map((option, index) => {
									return (
										<div
											className="cursor-pointer hover:text-dark-grey "
											key={index}
										>
											<Menu.Item>
												<p className="p-1 mx-4">
													{option}
												</p>
											</Menu.Item>
											{props.options &&
												index + 1 <
													props.options.length && (
													<hr className="mx-4 bg-dark-blue"></hr>
												)}
										</div>
									);
								})}
							</div>
						</Menu.Items>
					</Transition>
				)}
			</Menu>
		</div>
	);
};

export default ButtonWithDropdown;
