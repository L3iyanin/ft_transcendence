export interface channelMemberInterface {
	fullName: string;
	username: string;
	imgUrl: string;
	role: "owner" | "admin" | "member";
	status: "none" | "muted" | "banned";
}

export interface friendInterface {
	fullName: string;
	username: string;
	imgUrl: string;
}
