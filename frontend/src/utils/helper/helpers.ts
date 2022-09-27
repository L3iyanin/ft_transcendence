
export const paddingZero = (num: number, length: number = 2) => {
	let str = num.toString();
	
	while (str.length < length) {
		str = '0' + str;
	}
	
	return str;
}