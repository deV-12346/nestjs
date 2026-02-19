import { Body, Controller, Post, Query } from "@nestjs/common"
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/CreateUserDto";
import { VerifyUserDto } from "./dto/VerifyUserDto";

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

}
