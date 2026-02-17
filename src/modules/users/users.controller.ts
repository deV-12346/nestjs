import { Body, Controller, Post } from "@nestjs/common"
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/CreateUserDto";

@Controller("user")
export class UsersController {
    constructor(private readonly userService:UsersService){}
    @Post('/register')
    Register(@Body() body:CreateUserDto){
        return  this.userService.RegisterUser(body)
    }

}
