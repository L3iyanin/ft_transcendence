import { ApiProperty } from "@nestjs/swagger";

export class Leaderboard {

	@ApiProperty()
	rank: number;
	@ApiProperty()
	username: string;
	@ApiProperty()
	fullName: string;
	@ApiProperty()
	imgUrl: string;
	@ApiProperty()
	wins: number;
	@ApiProperty()
	loses: number;
	@ApiProperty()
	WinsMinusLoses: number;
}
