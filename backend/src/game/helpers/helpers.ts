export function generateMatchName(matchId: number): string {
	return `match_${matchId.toString()}`;
}

export function generateSpectatorsRoomName(matchId: number): string {
	return `spectators_${matchId.toString()}`;
}
