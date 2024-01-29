import { HttpClient, HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IS_LOADER_ENABLED } from './loader.interceptor';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  spinner=new Subject<boolean>();
  constructor(private http:HttpClient) { }
  display(){
    this.spinner.next(true)
  }
  hide(){
    this.spinner.next(false)
  }
  getCall(){
    return this.http.get('https://run.mocky.io/v3/b8efe9c1-6b48-47e6-987f-10abb9dc8391')
  }
  getParamsCall(){
    // const params = {params:new HttpParams()
    // .set('Name', 'sanju')};
    // console.log("p: ",params.toString())
    const context={context: new HttpContext().set(IS_LOADER_ENABLED, true)}
    return this.http.get('https://run.mocky.io/v3/e23a1df9-7659-4556-a6a1-5c84b77c6955',context)
  }
}
