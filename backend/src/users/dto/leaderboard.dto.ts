import { ApiProperty } from "@nestjs/swagger";

export class Leaderboard {
	@ApiProperty()
	data: {
		rank: number;
		username: string;
		fullName: string;
		imgUrl: string;
		wins: number;
		loses: number;
		WinsMinusLoses: number;
	};
}
