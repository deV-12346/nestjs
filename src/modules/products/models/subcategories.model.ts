import { AutoIncrement, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { CategoryModel } from "./categories.model";

@Table({
    tableName:"sub_categories",
    timestamps: true,
    createdAt:"created_at",
    updatedAt:"updated_at"
})
export class SubCategoryModel extends Model<SubCategoryModel, Partial<SubCategoryModel>>{
    @PrimaryKey
    @AutoIncrement
    @Column({
        type:DataType.INTEGER,
        field:"sub_c_id"
    })
    sub_c_id:number;

    @ForeignKey(()=>CategoryModel)
    @Column({
        type:DataType.INTEGER,
        allowNull:false,
        field:"c_id"
    })
    c_id:number;
    @BelongsTo(()=>CategoryModel)
    category:CategoryModel;

    @Column({
        type:DataType.STRING,
        allowNull:false,
        field:"sub_category_name",
        unique:true
    })
    sub_category_name:string
}