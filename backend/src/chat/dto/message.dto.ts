import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber, isNumber, IsOptional, IsString } from "class-validator";

export class Message {
	@ApiProperty()
	@IsBoolean()
	isDm: boolean;

	@ApiProperty()
	@IsNumber()
	@IsOptional()
	channelId?: number; // if the channel isn't a dm

	@ApiProperty()
	@IsString()
	@IsOptional()
	channelName?: string; // if the channel isn't a dm

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

// {
// 	"userId" : 1,
// 	"receiverId" : 2,
// 	"message" : "hi from 1 to 2",
// 	"isDm" : true
// }