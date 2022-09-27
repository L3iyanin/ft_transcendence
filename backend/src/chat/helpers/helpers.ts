

export function generateChannelName(memebrId1: number, memebrId2: number): string {
	const channelName =
		memebrId1 < memebrId2
			? `${memebrId1.toString()}_${memebrId2.toString()}`
			: `${memebrId2.toString()}_${memebrId1.toString()}`;
	return channelName;
}
