import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent {
  spinner:Subject<boolean>=this.service.spinner
  constructor(private service:ApiService){}
  callApi(){
    this.service.getCall().subscribe((res:any)=>{
      console.log("res: ",res)
    })
  }
  callGetApi(){
    this.service.getParamsCall().subscribe((res:any)=>{
      console.log("res: ",res)
    })
  }
}
