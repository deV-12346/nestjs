import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
interface Response<T>{
  data:T,
  messgae?:string
}
@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T,Response<T>>{
  intercept(context: ExecutionContext,next: CallHandler,): Observable<any> {
    return next.handle().pipe(
      map((data => ({data}))),
    );
  }
}
