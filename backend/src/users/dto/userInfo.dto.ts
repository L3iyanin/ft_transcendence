import {ApiProperty } from "@nestjs/swagger";
export class UserInfo {
	@ApiProperty()
	username: string;

	@ApiProperty()
	fullName: string;

	@ApiProperty()
	imgUrl: string;

	@ApiProperty()
	numberOfFreind: number;

	@ApiProperty()
	numberOfachivements: number;

	@ApiProperty()
	wins: number;

	@ApiProperty()
	loses: number;
}
