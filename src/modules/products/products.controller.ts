import { Body, Controller, Get, Post, Query, UseGuards } from "@nestjs/common";
import { ProductServices } from "./products.service";
import { Category } from "./dto/Category.dto";
import { AuthGuard } from "@nestjs/passport";
import { SubCategory } from "./dto/SubCategory.dto";

@Controller('products')
export class ProductController{
    constructor(private readonly productService:ProductServices){}
    @Get()
    getAllProducts(){

    }
    @Post()
    uploadProducts(){

    }
    @UseGuards(AuthGuard('jwt'))
    @Post('/add-category')
    AddCategory(@Body() dto:Category){
      return this.productService.AddCategory(dto)
    }
    @UseGuards(AuthGuard('jwt'))
    @Post('/add-sub-category')
    AddSubCategory(@Body() dto:SubCategory){
        return this.productService.AddSubCategory(dto)
    }
    @UseGuards(AuthGuard('jwt'))
    @Get('category')
    AllCategory(){
        return this.productService.AllCategory()
    }
    @UseGuards(AuthGuard('jwt'))
    @Get('sub-category')
    AllSubCategory(@Query('c_id') c_id: number){
        return this.productService.AllSubCategory(c_id)
    }
}