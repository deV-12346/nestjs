import { Module } from "@nestjs/common"
import { UsersController } from "./users.controller"
import { UsersService } from "./users.service"
import { SequelizeModule } from "@nestjs/sequelize"
import { OtpModel } from "./models/Otp.Model"
import { UserModel } from "./models/User.Model"

@Module({
 imports:[SequelizeModule.forFeature([UserModel,OtpModel])],
 controllers: [UsersController],
 providers: [UsersService],
})
export class UsersModule {}
