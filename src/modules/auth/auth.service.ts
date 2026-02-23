import { BadRequestException, Injectable } from "@nestjs/common"
import { UserModel } from "../users/models/User.Model";
import { InjectModel } from "@nestjs/sequelize";
import { LoginDto } from "./dto/loginUser.dto";
import { Response } from "express";
import * as bcrypt from "bcrypt"
import { JwtService } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
@Injectable()
export class AuthService {
    constructor(@InjectModel(UserModel) private readonly userModel:typeof UserModel,
   private readonly jwtService:JwtService,
   private readonly configService:ConfigService){}
    async generateAccessToken(user:any) {
        const payload = {
            sub:user.u_id,
            username:user.username,
            email:user.email
        }
        const accessToken = await this.jwtService.signAsync(payload,{
            secret: process.env.ACCESS_TOKEN,
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY as any
        })
        return accessToken
    }
    async generateRefreshToken(user:any) {
        const payload = {
            sub:user.u_id,
            username:user.username,
            email:user.email
        }
        const refreshToken = await this.jwtService.signAsync(payload,{
            secret: process.env.REFRESH_TOKEN,
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY as any,
        })
        return refreshToken
    }
    async login(credentails:LoginDto,res:Response){
      const {email,password} = credentails
      const user = await this.userModel.findOne({
        where:{email}
      })
      if(!user){
        throw new BadRequestException('User not found')
      }
      if(user && !user.isverified){
        throw new BadRequestException('Please verify your account first')
      }
      const isMacthed = await bcrypt.compare(password,user.password)
      if(!isMacthed){
        throw new BadRequestException("Invalid Password")
      }
      const accessToken = await this.generateAccessToken(user)
      const refreshToken = await this.generateRefreshToken(user)
      const updateUser = await user.update({
        refreshtoken:refreshToken
      })
      console.log(updateUser)
      const options = {
        httpOnly:true,
        secure:true
      }
      res.cookie('refreshToken',refreshToken,options)
      res.cookie('accessToken',accessToken,options)
      return {
        message:"Login successfully"
      }
    }
}
