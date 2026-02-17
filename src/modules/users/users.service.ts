import { BadRequestException, Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/sequelize";
import { UserModel } from "./models/User.Model";
import { CreateUserDto } from "./dto/CreateUserDto";
import { OtpModel } from "./models/Otp.Model";
import { Sequelize } from "sequelize-typescript";


@Injectable()
export class UsersService {
    constructor(
    @InjectModel(UserModel) private readonly userModel: typeof UserModel,
    @InjectModel(OtpModel) private readonly otpModel:typeof OtpModel,
    private readonly sequelizer:Sequelize){}
    async RegisterUser(dto:CreateUserDto){
        const transcation = await this.sequelizer.transaction()
        try {
            const {username,email,password,dob,age,gender,primarycontact,secondarycontact} = dto
            const user = await this.userModel.findOne({where:{email}})
            console.log(user)  
            if(user && user.isverified){
                throw new BadRequestException('User already exists')
            }else{
                const otp = Math.floor(1000+Math.random()*9000)
                const otpexpiry = new Date(Date.now() + 1000*60*5)
                // update otp
                
                if (user && !user.isverified){
                    const newotp = await this.otpModel?.update({
                    otp:otp,
                    otp_expiry:otpexpiry
                    },{where:{u_id: user?.u_id},transaction:transcation})
                    await transcation.commit();
                    console.log(newotp)
                    return {
                        success:true,
                        message:"OTP resent successfully",
                        otp
                    }
                }else{
                    // new user 
                    const newUser = await this.userModel.create({
                        email,
                        password,
                        username,
                        age: age ?? null,
                        dob,
                        isverified:false,
                        primary_contact:primarycontact,
                        secondary_contact: secondarycontact ?? null,
                        gender:gender
                    },{transaction:transcation})
                    await this.otpModel.create({
                        otp,
                        otp_expiry:otpexpiry,
                        u_id:newUser.u_id
                    },{transaction:transcation})
                    await transcation.commit()
                    return {
                        success:true,
                        message:"OTP sent successfully"
                    }
                }

            }
        } catch (error) {
            await transcation.rollback()
            console.log("ERROR",error)
            return {
                success:false,
                message:"Something went wrong"
            }
        }
    }
}
