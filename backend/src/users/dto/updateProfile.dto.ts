import { MaxLength } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";
import {IsAlpha, IsNotEmpty, IsString } from "class-validator";
export class Form {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @IsAlpha()
	@MaxLength(19, {
		message: 'UserName is too long, maximun is 19',
	  })
    name: string;
}

