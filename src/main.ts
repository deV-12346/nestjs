import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { ValidationPipe } from "@nestjs/common"
import { AllExceptionFilter } from "./common/AllExceptionFilter"
import { ResponseInterceptor } from "./common/response.interceptor"

async function bootstrap() {
 const app = await NestFactory.create(AppModule)
 app.setGlobalPrefix("v1")
 app.useGlobalPipes(
  new ValidationPipe({
   whitelist: true,
   forbidNonWhitelisted: true,
   transform: true,
  })
 )
 app.useGlobalFilters(new AllExceptionFilter())
 app.useGlobalInterceptors(new ResponseInterceptor())
 await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
