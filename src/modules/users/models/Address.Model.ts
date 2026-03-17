import { AutoIncrement, BelongsTo, Column, DataType, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { UserModel } from "./User.Model";
import { Address, address_type } from "../types/address";

@Table({
        tableName:'addresses',
        timestamps:true,
        createdAt:"created_at",
        updatedAt:"updated_at",
})
export class AddressModel extends Model<Address>{
    @PrimaryKey
    @AutoIncrement
    @Column({
        type:DataType.INTEGER,
        field:'address_id'
    })
    address_id:number;

    @ForeignKey(()=>UserModel)
    @Column({
        type:DataType.INTEGER,
        allowNull:false,
        field:"u_id"
    })
    u_id:number;
    @BelongsTo(()=>UserModel)
    user:UserModel;
   
    @Column({
        type:DataType.BOOLEAN,
        field:"is_primary",
        defaultValue:false
    })
    is_primary:boolean;

    @Column({
        type:DataType.ENUM(...Object.values(address_type)),
        field:'type',
        allowNull:false
    })
    type:address_type;

    @Column({
        type:DataType.STRING,
        allowNull:false,
        field:'city'
    })
    city:string;

    @Column({
        type:DataType.STRING,
        allowNull:true,
        field:'street'
    })
    street:string;
    
    @Column({
        type:DataType.STRING,
        allowNull:false,
        field:'state'
    })
    state:string;
    
    @Column({
        type:DataType.STRING,
        allowNull:false,
        field:'nation'
    })
    nation:string;

    @Column({
        type:DataType.STRING,
        allowNull:false,
        field:'pincode'
    })
    pincode:string;

    @Column({
        type:DataType.STRING,
        allowNull:false,
        field:'contact_no'
    })
    contact_no:string;
}