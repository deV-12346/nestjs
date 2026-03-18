import { Module } from "@nestjs/common";
import { ProductServices } from "./products.service";
import { ProductController } from "./products.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { CategoryModel } from "./models/categories.model";
import { SubCategoryModel } from "./models/subcategories.model";

@Module({
    imports:[SequelizeModule.forFeature([CategoryModel,SubCategoryModel])],
    providers:[ProductServices],
    controllers:[ProductController]
})
export class ProductModule{}