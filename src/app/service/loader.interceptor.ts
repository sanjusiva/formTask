import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpContextToken
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  constructor(private api:ApiService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log("int req: ",request.context.has(IS_LOADER_ENABLED))
    if(request.context.has(IS_LOADER_ENABLED)){
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

export const IS_LOADER_ENABLED = new HttpContextToken<boolean>(() => false);