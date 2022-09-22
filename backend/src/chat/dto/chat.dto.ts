import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsNotEmpty, IsOptional, IsString } from "class-validator";
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
