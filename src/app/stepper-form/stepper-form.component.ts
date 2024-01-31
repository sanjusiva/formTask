import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-stepper-form',
  templateUrl: './stepper-form.component.html',
  styleUrls: ['./stepper-form.component.css']
})
export class StepperFormComponent implements OnInit{
  formConfig:any;
  public myForm: FormGroup = this.formBuilder.group({});

constructor(private api:ApiService,private formBuilder:FormBuilder){}
  ngOnInit(){
    this.api.getStepperFormField().subscribe((res)=>{
      console.log(res);
      this.formConfig=res
      this.buildForm(this.formConfig?.pageOne.controls);
      this.buildForm(this.formConfig?.pageTwo.controls);
      this.buildForm(this.formConfig?.pageThree.controls);
    })
  }
  buildForm(controls: any[]) {
    
    let validatorsToAdd=[];
    for (const ele of controls) {
      
      if (ele.type !== 'button') {
        let key,value:any;
        for ([key, value] of Object.entries(ele.validators)) {
          console.log('form value: ',value)
          switch (key) {
            case 'required':
              if (value) {
                validatorsToAdd.push(Validators.required);
              }
              break;
            case 'pattern':
              if(value){
                validatorsToAdd.push(Validators.pattern(value));
              }
              break;
          }
        }
        this.myForm.addControl(ele.name, this.formBuilder.control(ele.value,validatorsToAdd));
        console.log("form: ",this.myForm);
        
      }
    }
    
    
  }
  onSubmit(){
    console.log('submit: ',this.myForm.value)
  }
  statusPass(name:any):FormControl{
    console.log('mm status pass: ',name);
    
    return this.myForm.get(name) as FormControl
  }
  errorMsgPass(data:any){
    console.log('data msg: ',data)
    return data.validationMsg
  }
}
