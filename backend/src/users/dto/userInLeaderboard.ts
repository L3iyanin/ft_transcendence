import { ApiProperty } from "@nestjs/swagger";

export class userInLeaderboard {

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
	losses: number;
	@ApiProperty()
	WinsMinuslosses: number;
}
