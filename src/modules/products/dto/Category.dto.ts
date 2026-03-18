import { IsNotEmpty, IsString } from "class-validator";

export class Category{
    @IsString()
    @IsNotEmpty()
    category_name:string
}