import { IsBoolean, IsHexColor, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, IS_ALPHA } from "class-validator";
export class Form {

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    name: string;
    @IsNotEmpty()
    @IsOptional()
    twoFF: string;
}

