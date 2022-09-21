import { ApiProperty } from "@nestjs/swagger";

export class Friend {
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
}
