/** @type {import('tailwindcss').Config} */
module.exports = {
	mode: "jit",
	purge: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				"red": "#E30039",
				"white": "#FFFFFF",
				"dark-60": "#151B26",
				"yellow": "#FFC400",
				"dark-blue": "#32333E",
				"green": "#3BA55D",
				"beige": "#E6DCCF",
				"grey": "#303030",
				"light-gray": "#D9D9D9",
				"dark-yellow": "#E3AF00",
				"dark-100": "#2B3649",
				"grey-2": "#C4C5CC",
				"dark-grey": "#757575",
			}
		},
	},
	plugins: [],
};
