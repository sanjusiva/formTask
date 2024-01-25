import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit{
  formData:any;
  constructor(private http: HttpClient){}
  ngOnInit() {
    // this.myForm = this.formBuilder.group({
    //   name: 'Sanju',
    //   email: '',
    //   message: ''
    // });
    this.http.get('/assets/form.json').subscribe((res:any)=>{
      console.log("res: ",res)
      this.formData=res
    })
  }
}
