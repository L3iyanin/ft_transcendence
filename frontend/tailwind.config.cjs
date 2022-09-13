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
			fontSize: {
				'3xs': '0.25rem',
				'xxs': '0.5rem',
			},
			// height : {
			// 	'xs' : '0.75em',
			// 	'sm' : '0.875em',
			// 	'base' : '1em',
			// 	'lg' : '1.5em',
			// 	'xl' : '1.25em',
			// 	'2xl' : '1.5em'
			// },

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
