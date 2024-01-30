import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../service/api.service';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-stepper-form',
  templateUrl: './stepper-form.component.html',
  styleUrls: ['./stepper-form.component.css']
})
export class StepperFormComponent implements OnInit{
  formConfig:any;
  stepper!:MatStepper;
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
        
        for (const [key, value] of Object.entries(ele.validators)) {
          switch (key) {
            case 'required':
              if (value) {
                validatorsToAdd.push(Validators.required);
              }
              break;
            // case 'pattern':
            //   validatorsToAdd.push(Validators.pattern(value));
            //   break;
          }
        }
        this.myForm.addControl(ele.name, this.formBuilder.control(ele.value,validatorsToAdd));
        console.log("form: ",this.myForm);
        
      }
    }
    
    
  }
  handleStepper(name:any){
    if(name=='Previous'){
      this.stepper.previous()
    }
  }
  onSubmit(){
    console.log('submit: ',this.myForm.value)
  }
}
