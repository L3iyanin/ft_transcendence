

export const getMessageWithLength = (message: string | undefined, length: number = 19) => {

	if (message === undefined) {
		return "";
	}
	else {
		return message.length > length ? message.substring(0, length) + "..." : message;
	}
}