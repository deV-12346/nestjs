import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { Category } from "./dto/Category.dto";
import { InjectModel } from "@nestjs/sequelize";
import { CategoryModel } from "./models/categories.model";
import { AllExceptionFilter } from "src/common/AllExceptionFilter";
import { SubCategory } from "./dto/SubCategory.dto";
import { SubCategoryModel } from "./models/subcategories.model";

@Injectable()
export class ProductServices{
    constructor(@InjectModel(CategoryModel) private readonly categoryModel: typeof CategoryModel,
    @InjectModel(SubCategoryModel) private readonly subCategoryModel: typeof SubCategoryModel){}
    public async AddCategory(dto:Category){
            const {category_name} = dto
            const res = await this.categoryModel.findOne({
                where:{category_name}
            })
            if(res){
                throw new BadRequestException('This Category already exists')
            }
            const newCategory = await this.categoryModel.create({
                category_name
            })
            console.log(newCategory)
            return {
                message:"Category created successfully"
            }
    }
    public async AddSubCategory(dto:SubCategory){
      const {c_id,sub_category_name} = dto
      const isCategoryExists = await this.categoryModel.findByPk(c_id)
      if(!isCategoryExists){
        throw new NotFoundException("Category not found")
      }
      const newSubCategory = await this.subCategoryModel.findOne({
        where:{c_id,sub_category_name}
      })
      if(newSubCategory){
        throw new BadRequestException('Sub Category already assocaited with this category')
      }
      await this.subCategoryModel.create({
        c_id,
        sub_category_name
      })
      return {
        message:"Sub Category created Successfully"
      }
    }
    public async AllCategory(){
        const categories = await this.categoryModel.findAll()
        if(categories.length === 0){
            throw new NotFoundException('No Category Found')
        }
        return {
            data:categories,
            message:"Categories found successfully"
        }
    }
    public async AllSubCategory(c_id: number){
       const sub_categories = await this.subCategoryModel.findAll({where:{c_id}})
       if(sub_categories.length === 0){
        throw new NotFoundException("No Sub category assocaited with this category")
       }
       return {
        data:sub_categories,
        message:"sub categories found successfully"
       }
    }
}