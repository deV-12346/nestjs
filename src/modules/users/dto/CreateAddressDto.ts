import { IsBoolean, IsEnum, IsMobilePhone, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";
import { address_type } from "../types/address";

export class CreateAddressDto {
    @IsOptional()
    u_id:number;

    @IsBoolean()
    is_primary:boolean;

    @IsEnum(address_type)
    @IsNotEmpty()
    type:string;

    @IsString()
    @IsNotEmpty()
    city:string;

    @IsString()
    street:string;

    @IsString()
    @IsNotEmpty()
    state:string;

    @IsString()
    @IsNotEmpty()
    nation:string;

    @IsString()
    @Length(6)
    @IsNotEmpty()
    pincode:string;

    @IsMobilePhone()
    @IsNotEmpty()
    contact_no:string;
}