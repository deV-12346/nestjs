import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { SequelizeModule } from "@nestjs/sequelize"
import { UsersModule } from "./modules/users/users.module"
import { AuthModule } from "./modules/auth/auth.module"
import { PassportModule } from "@nestjs/passport"
import { ProductModule } from "./modules/products/products.module"
@Module({
 imports: [
  ConfigModule.forRoot({
   isGlobal: true,
  }),
  SequelizeModule.forRoot({
   dialect: "postgres",
   database: process.env.DB_NAME,
   username: process.env.DB_USERNAME,
   password: process.env.DB_PASSWORD as string,
   host: process.env.DB_HOST,
   port: Number(process.env.DB_PORT),
   autoLoadModels: true,
  }),
  AuthModule,
  UsersModule,
  ProductModule,
  PassportModule.register({ defaultStrategy: 'jwt', global: true }),
 ],
})
export class AppModule {}
