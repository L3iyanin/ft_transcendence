import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber, isNumber, IsOptional, IsString } from "class-validator";

export class Message {
	@ApiProperty()
	@IsBoolean()
	isDm: boolean;

	@ApiProperty()
	@IsNumber()
	@IsOptional()
	channelId: number; // if the channel isn't a dm

	@ApiProperty()
	@IsString()
	@IsOptional()
	channelName: string; // if the channel isn't a dm

	@ApiProperty()
	@IsNumber()
	userId: number;

	@ApiProperty()
	@IsNumber()
	@IsOptional()
	receiverId?: number; // if the channel is dm

	@ApiProperty()
	@IsString()
	content: string;
}






/*

	{
		"userId" : 5,
		"receiverId" : 6,
		"content" : "hi from 5 to 6",
		"isDm" : true,
		"channelName": "5_6",

	}

	{
	"userId": 5,
	"receiverId": 6,
	"content": "wax a xabab rah la3ebin gheda",
	"isDm": false,
	"channelName": "l3iyanin",
	"channelId": 2
	}

	{
	"username": "user5",
	"fullName": "user5",
	"id": 5
	}
*/