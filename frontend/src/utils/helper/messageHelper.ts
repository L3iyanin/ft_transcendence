

export const getMessageWithLength = (message: string | undefined, length: number = 30) => {

	if (message === undefined) {
		return "";
	}
	else {
		return message.length > length ? message.substring(0, length) + "..." : message;
	}
}