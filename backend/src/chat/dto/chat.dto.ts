import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsIn, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
export class CreateChannelDto {
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	name: string;

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	@IsIn(["PUBLIC", "PRIVATE", "PROTECTED"])
	type: "PUBLIC" | "PRIVATE" | "PROTECTED";

	@ApiProperty()
	@IsString()
	@IsOptional()
	password?: string;
}

export class MessageDto {
	id: number;
	content: string;
	channelId: number;
	sender: {
		id: number;
		username: string;
		fullName: string;
		login: string;
		imgUrl: string;
	};
	date: Date;
	invite?: boolean;
}

export class MuteOrBlockDto {
	@ApiProperty()
	@IsNumber()
	@IsIn([2, 60, 300, 1440])
	time: 2 | 60 | 300 | 1440;
}

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
