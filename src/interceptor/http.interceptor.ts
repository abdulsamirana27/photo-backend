import { ResponseData } from '@dtos/response/response.dto';
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class HttpInterceptor implements NestInterceptor {
  constructor(){}
  request:any;
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(map(data=>this.transformData(data)));
  }
  transformData(data:any){
    if(typeof data == 'object'){
      // if(data.stream)
      // { 
      //   return data;
      // }
      var resp:ResponseData<any>={
        message : '',
        success : true,
        data : data,
      };
    }
    else{
      var resp:ResponseData<any>={
        message : data,
        success : false,
      };
    }
    return resp;
  }
  
}
