import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";


export class Form {

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    name: string;


    @IsNotEmpty()
    @IsOptional()
    twoFF: string;

}

