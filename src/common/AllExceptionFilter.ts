import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { Response } from "express";
@Catch()
export class AllExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
      const ctx = host.switchToHttp() 
      const response = ctx.getResponse<Response>()  
      if(exception instanceof HttpException){
        const status = exception.getStatus()
        const message = exception.getResponse() as any
        return response.status(status).json({
               success:false,
               message:message?.message,
               statusCode:status
        })
      }else{
        return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
               success:false,
               message:'Internal Server Error',
               statusCode:HttpStatus.INTERNAL_SERVER_ERROR
        })
      }
    }
}