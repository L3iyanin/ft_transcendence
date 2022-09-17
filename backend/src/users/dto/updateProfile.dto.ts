import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class Form {
    // Validates for a non-empty string
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    name: string;

  // Gets only validated if it's part of the request's body
    // @HasM
    @IsNotEmpty()
    @IsOptional()
    email: string;

  // Validates for an integer
    @IsNumber()
    age: number;

  // Validates for an integer
    @IsBoolean()
    acceptedTOS: boolean;

}