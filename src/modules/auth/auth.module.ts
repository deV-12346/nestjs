import { Module } from "@nestjs/common"
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { RefreshStrategy } from "./strategies/refresh.strategy";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { UsersModule } from "../users/users.module";
import { PassportModule } from "@nestjs/passport";
import { SequelizeModule } from "@nestjs/sequelize";
import { UserModel } from "../users/models/User.Model";

@Module({
    imports:[
        UsersModule,
        PassportModule,
        JwtModule.register({}),
        SequelizeModule.forFeature([UserModel])
    ],
    providers:[AuthService,JwtStrategy,RefreshStrategy],
    controllers:[AuthController]
})
export class AuthModule {}
