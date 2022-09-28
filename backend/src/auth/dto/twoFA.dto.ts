import { IsAlpha, IsNotEmpty, IsString } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class TwoFADto {
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    userId: number;

	@ApiProperty()
    @IsString()
    @IsNotEmpty()
    secret: string;
}
