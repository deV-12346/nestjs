import { AutoIncrement, Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript"
interface UserAttributes{
    u_id?:number | null;
    username:string;
    email:string;
    password:string;
    primary_contact:string;
    secondary_contact?:string | null;
    age?:number | null;
    gender: Gender;
    dob:Date;
    refreshtoken?:string | null
    isverified:boolean
    created_at?:Date;
    updated_at?:Date;
}
export enum Gender {
  MALE = 'Male',
  FEMALE = 'Female',
  TRANS = 'Trans',
}

@Table({
 tableName: "users",
 timestamps: true,
 createdAt: "created_at",
 updatedAt: "updated_at",
})
export class UserModel extends Model<UserAttributes> implements UserAttributes {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare u_id:number;

    @Column({
        type:DataType.STRING,
        allowNull:false,
        unique:true
    })
    declare username:string;

    @Column({
        type:DataType.STRING,
        allowNull:false,
        unique:true
    })
    declare email:string;

    @Column({
        type:DataType.TEXT,
        allowNull:false,
    })
    declare password:string;

    @Column({
        type:DataType.STRING,
        allowNull:false,
        unique:true
    })
    declare primary_contact:string;

    @Column({
    type: DataType.TEXT,
    allowNull: true
    })
   declare refreshtoken: string | null;

    @Column({
        type:DataType.STRING,
        allowNull:true
    })
    declare secondary_contact:string | null;

    @Column({
        type:DataType.INTEGER,
        allowNull:true
    })
    declare age:number | null;
    @Column({
    type: DataType.ENUM(...Object.values(Gender)),
    allowNull: false
    })
   declare gender: Gender;

    @Column({
        type:DataType.DATE,
        allowNull:false
    })
    declare dob:Date;

    @Column({
        field:'isverified',
        type:DataType.BOOLEAN,
        defaultValue:false
    })
    declare isverified:boolean;
}
