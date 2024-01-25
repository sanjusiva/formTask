import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  constructor(private api:ApiService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log("int req: ",request.params,request.params.get('Name'))
    if(request.params.get('Name')){
      this.api.display()
    }
    return next.handle(request).pipe(
      finalize(()=>{
        console.log('in')
          this.api.hide();
      })
    );
  }
}
