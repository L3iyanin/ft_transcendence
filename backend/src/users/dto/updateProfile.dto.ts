import { ApiProperty } from "@nestjs/swagger";
import { IsAlpha, IsNotEmpty, IsOptional, IsString } from "class-validator";
export class Form {
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	@IsAlpha()
	name: string;
}
