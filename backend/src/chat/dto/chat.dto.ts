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
	@IsNotEmpty()
	@IsOptional()
	password?: string;
}
