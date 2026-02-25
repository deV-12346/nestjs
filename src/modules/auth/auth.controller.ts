import { Body, Controller, Post, Req, Res, UseGuards } from "@nestjs/common"
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/loginUser.dto";
import type { Request, Response } from "express";
import { AuthGuard } from "@nestjs/passport";

@Controller("auth")
export class AuthController {
    constructor(private readonly authService:AuthService){}
    @Post('/login')
    login(@Body() credential:LoginDto,@Res({passthrough:true}) res:Response){
        return this.authService.login(credential,res)
    }
    @UseGuards(AuthGuard('jwt-refresh'))
    @Post('/regenerate-refresh-token')
    RegenerateRegreshToken(
        @Req() req:Request,
        @Res({passthrough:true}) res:Response){
        console.log(req.user)
        const {u_id} = req.user
        return this.authService.regenerateRefreshToken(u_id,req.cookies.refreshToken,res)
    }
    @UseGuards(AuthGuard('jwt'))
    @Post('/logout')
    Logout(@Req() req:Request,@Res({passthrough:true}) res:Response){
        console.log(req.user)
       const {u_id} = req.user
       return this.authService.logout(u_id,res)
    }
}
