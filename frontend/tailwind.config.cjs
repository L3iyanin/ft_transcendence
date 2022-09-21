/** @type {import('tailwindcss').Config} */
module.exports = {
	mode: "jit",
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		letterSpacing: {
			superwide : '0.5em'
		},
		container: {
			center: true,
		},
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
			},
			inset: {
				// these units are inspired from the width tailwind definitions
				'4/5': '80%',
				'8/12' : '66.666667%',
				'9/12': '75%',
				'10/12': '83.333333%',
				'11/12': '91.666667%',
			},
		},
	},
	plugins: [],
};