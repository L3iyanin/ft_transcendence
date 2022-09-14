// import { IsInt, IsString } from 'class-validator';

import {ApiBody, ApiProperty}  from "@nestjs/swagger";
export class UserProfile {
	@ApiProperty()
	username: string;
	@ApiProperty()
	fullName: string;
	@ApiProperty()
	imgUrl: String;
	@ApiProperty()
	numberOfFreind: number;
	@ApiProperty()
	numberOfachivements: number;
	@ApiProperty()
	wins : number
	@ApiProperty()
	loses: number
}
