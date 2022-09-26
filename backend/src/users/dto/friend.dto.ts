import { ApiProperty } from "@nestjs/swagger";

export class Friend {
	@ApiProperty()
	id: number;

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
}
