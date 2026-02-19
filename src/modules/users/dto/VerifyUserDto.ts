import { Type } from "class-transformer";
import { IsEmail, IsNotEmpty } from "class-validator";

export class VerifyUserDto{
    @IsEmail()
    @IsNotEmpty()
    email!:string;
    
    @Type(()=>Number)
    @IsNotEmpty()
    otp!:number;
}