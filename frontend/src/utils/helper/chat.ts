
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
