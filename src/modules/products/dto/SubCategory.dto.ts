import { Type } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";
import { INTEGER } from "sequelize";

export class SubCategory {
    @IsString()
    @IsNotEmpty()
    sub_category_name:string

    @Type(()=>INTEGER)
    @IsNotEmpty()
    c_id: number

}