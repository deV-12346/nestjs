import { Body, Controller, Get, Post, Query, Req, UseGuards } from "@nestjs/common"
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/CreateUserDto";
import { VerifyUserDto } from "./dto/VerifyUserDto";
import { AuthGuard } from "@nestjs/passport";
import type { Request } from "express";

@Controller("user")
export class UsersController {
    constructor(private readonly userService:UsersService){}
    @Post('/register')
    Register(@Body() body:CreateUserDto){
        return  this.userService.RegisterUser(body)
    } 
    @Post('verify-otp')
    VerifyOtp(@Query() query:VerifyUserDto){
        return this.userService.VerifyOtp(query)
    }
    @UseGuards(AuthGuard('jwt'))
    @Get('/my-profile')
    MyProfile(@Req() req:Request){
      const {u_id} = req.user
      return this.userService.MyProfile(u_id)
    }
}
