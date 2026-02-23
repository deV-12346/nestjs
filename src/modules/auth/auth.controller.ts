import { Body, Controller, Post, Res } from "@nestjs/common"
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/loginUser.dto";
import type { Response } from "express";

@Controller("auth")
export class AuthController {
    constructor(private readonly authService:AuthService){}
    @Post('/login')
    login(@Body() credential:LoginDto,@Res({passthrough:true}) res:Response){
        return this.authService.login(credential,res)
    }
}
