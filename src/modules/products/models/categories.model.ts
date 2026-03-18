import { AutoIncrement, Column, DataType, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { SubCategoryModel } from "./subcategories.model";

@Table({
    tableName:"categories",
    timestamps: true,
    createdAt:"created_at",
    updatedAt:"updated_at"
})
export class CategoryModel extends Model<CategoryModel, Partial<CategoryModel>> {
    @PrimaryKey
    @AutoIncrement
    @Column({
        type:DataType.INTEGER,
        field:"c_id"
    })
    c_id:number

    @Column({
        type:DataType.STRING,
        unique:true,
        field:"category_name",
        allowNull:false
    })
    category_name:string;

    @HasMany(()=>SubCategoryModel)
    sub_category:SubCategoryModel[]
}