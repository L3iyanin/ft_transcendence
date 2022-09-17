import {ApiProperty } from "@nestjs/swagger";
export class UserInfo {
	@ApiProperty()
	id: number;

	@ApiProperty()
	username: string;

	@ApiProperty()
	fullName: string;

	@ApiProperty()
	imgUrl: string;

	@ApiProperty()
	numberOfFriends: number;

	@ApiProperty()
	numberOfAchievements: number;

	@ApiProperty()
	wins: number;

	@ApiProperty()
	loses: number;
}
