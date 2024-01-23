import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'formTask';
  // myForm!:FormGroup ;
  formData:any;
  constructor(private formBuilder:FormBuilder,private http: HttpClient){}
  ngOnInit() {
    // this.myForm = this.formBuilder.group({
    //   name: 'Sanju',
    //   email: '',
    //   message: ''
    // });
    this.http.get('/assets/form.json').subscribe((res)=>{
      console.log("res: ",res)
      this.formData=res
    })
  }
  

}
