
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