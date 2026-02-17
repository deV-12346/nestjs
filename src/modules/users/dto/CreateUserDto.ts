import { Type } from "class-transformer";
import { IsDate, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional,
     IsPhoneNumber, IsString, IsStrongPassword,MaxLength, 
     MinLength} from "class-validator";
import { Gender } from "../models/User.Model";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @MaxLength(10)
    username!:string;

    @IsNotEmpty()
    @IsEmail()
    email!:string;
   
    @IsNotEmpty()
    @Type(()=>Date)
    @IsDate()
    dob!:Date;
   
    @IsNumber()
    @IsOptional()
    age!:number;
    
    @IsStrongPassword()
    @IsNotEmpty()
    password!:string;

    @IsNotEmpty()
    @IsPhoneNumber('IN')
    primarycontact!:string;

    @IsOptional()
    @IsPhoneNumber('IN')
    secondarycontact!:string;
   
    @IsNotEmpty()
    @IsEnum(Gender)
    gender!: Gender;
}