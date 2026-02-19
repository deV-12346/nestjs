import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common"
import { InjectModel } from "@nestjs/sequelize";
import { UserModel } from "./models/User.Model";
import { CreateUserDto } from "./dto/CreateUserDto";
import { OtpModel } from "./models/Otp.Model";
import { Sequelize } from "sequelize-typescript";
import { VerifyUserDto } from "./dto/VerifyUserDto";
import * as bcrypt from "bcrypt"

@Injectable()
export class UsersService {
    constructor(
    @InjectModel(UserModel) private readonly userModel: typeof UserModel,
    @InjectModel(OtpModel) private readonly otpModel:typeof OtpModel,
    private readonly sequelizer:Sequelize){}
    async RegisterUser(dto:CreateUserDto){
        const t = await this.sequelizer.transaction()
        try {
            const {username,email,password,dob,age,gender,primarycontact,secondarycontact} = dto
            const user = await this.userModel.findOne({
                where:{email},
                transaction:t,
            })  
            if(user && user.isverified){
                throw new BadRequestException('User already exists')
            }else{
                const otp = Math.floor(1000+Math.random()*9000)
                const otpexpiry = new Date(Date.now() + 1000*60*5)
                const hasedPassword = await bcrypt.hash(password,10)
                // update otp
                
                if (user && !user.isverified){
                    const updateUser = await this.userModel.update({
                    password:hasedPassword,
                    username,
                    age: age ?? null,
                    dob,
                    isverified:false,
                    primary_contact:primarycontact,
                    secondary_contact: secondarycontact ?? null,
                    gender:gender,
                    },
                    {
                    where:{u_id:user.u_id},
                    transaction:t,
                    })
                    const newotp = await this.otpModel?.update({
                    otp:otp,
                    otp_expiry:otpexpiry
                    },{where:{u_id: user?.u_id},transaction:t})
                    await t.commit();
                    console.log(newotp)
                    return {
                        message:"OTP resent successfully",
                        otp
                    }
                }else{
                    // new user 
                    const newUser = await this.userModel.create({
                        email,
                        password:hasedPassword,
                        username,
                        age: age ?? null,
                        dob,
                        isverified:false,
                        primary_contact:primarycontact,
                        secondary_contact: secondarycontact ?? null,
                        gender:gender
                    },{transaction:t})
                    await this.otpModel.create({
                        otp,
                        otp_expiry:otpexpiry,
                        u_id:newUser.u_id
                    },{transaction:t})
                    await t.commit()
                    return {
                        message:"OTP sent successfully"
                    }
                }

            }
        } catch (error) {
            await t.rollback()
            console.log(error)
            throw error
        }
    }
    async VerifyOtp(query:VerifyUserDto){
       try {
        const {email,otp} = query
        const user = await this.userModel.findOne({where:{email}})
        if(!user){
            throw new NotFoundException('User not found')
        }
        const userOtp = await this.otpModel.findOne({where:{u_id:user.u_id}})
        if(!userOtp || !userOtp.otp_expiry || !userOtp.otp){
            throw new NotFoundException("OTP not found")
        }
        const now = new Date(Date.now())
        console.log(now)
        console.log(typeof otp)
        if(userOtp?.otp_expiry < now){
            throw new BadRequestException("OTP expired")
        }
        if(Number(userOtp.otp) !== otp){
            throw new BadRequestException('Invalid OTP')
        }else{
            await userOtp.update({
                otp:null,
                otp_expiry:null
            })
            await user.update({
                isverified:true
            })
            return {
                message:"User Verified successfully"
            }
        }
       } catch (error) {
           throw error
       }
    }
}
