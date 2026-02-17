import { Model,AutoIncrement, BelongsTo, Column, DataType, ForeignKey, PrimaryKey, Table, UpdatedAt } from "sequelize-typescript";
import { UserModel } from "./User.Model";

export interface OtpAttributes {
  id?: number;
  u_id: number;
  otp?: number | null;
  otp_expiry?: Date | null;
  created_at?: Date;
  updated_at?: Date;
}

@Table({
    tableName:"otp",
    timestamps:true,
    createdAt:"created_at",
    updatedAt:"updated_at"
})

export class OtpModel extends Model<OtpAttributes>{
     @PrimaryKey
     @AutoIncrement
     @Column({
        type:DataType.INTEGER
    })
    declare id:number;
    
    @ForeignKey(()=>UserModel)
    @Column({
        type:DataType.INTEGER,
        allowNull:false,
        unique:true,
    })
    declare u_id:number;

    @BelongsTo(() => UserModel)
    user!: UserModel;

    @Column({
        type:DataType.INTEGER,
        allowNull:true
    })
    declare otp:number | null;

    @Column({
        type:DataType.DATE,
        allowNull:true
    })
    declare otp_expiry:Date | null

}
