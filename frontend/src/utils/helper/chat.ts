
export const IamAdminOrOwner = (members:IMember[], myId: number) => {
	for (let i = 0; i < members.length; i++) {
		if (
			(members[i].role === "ADMIN" ||
			members[i].role === "OWNER") &&
			members[i].user.id === myId
			) {
			return true;
		}
	}
	return false;
}

export const isUserOnline = (name: string, onlineUsers: IOnlineUser[]): boolean => {
	return onlineUsers.some(
		(userData) =>
			userData.user.fullName.toLocaleLowerCase() ===
			name.toLocaleLowerCase()
	);
};

export const isUserOnlineOrInGame = (name: string, onlineUsers: IOnlineUser[]): {
	isOnline: boolean,
	isInGame: boolean
} => {

	const userData = onlineUsers.find(
		(userData) =>
			userData.user.fullName.toLocaleLowerCase() ===
			name.toLocaleLowerCase()
	);

	if (userData) {
		return {
			isOnline: true,
			isInGame: userData.user.inGame
		}
	}

	return {
		isOnline: false,
		isInGame: false
	}
}
