import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-stepper-form',
  templateUrl: './stepper-form.component.html',
  styleUrls: ['./stepper-form.component.css']
})
export class StepperFormComponent implements OnInit,OnChanges{
  isLinear:boolean=true
  formConfig:any;
  id:string[]=[]
  // public myForm: FormGroup = this.formBuilder.group({});
  // myOwnForm=this.formBuilder.group({
  //   fields: this.formBuilder.array([])
  // });
  myForm:FormGroup = this.formBuilder.group({});
  stateName:any={};
  // formArray = this.myOwnForm.get('fields') as FormArray;

constructor(private api:ApiService,private formBuilder:FormBuilder){}
  ngOnChanges(){
    // this.stateName.
    console.log("change val: ",this.formConfig)
  }
  ngOnInit(){
    this.api.getStepperFormField().subscribe((res)=>{
      console.log(Object.entries(res).length);
      this.formConfig=res
      Object.entries(res).forEach(([k,v])=>{
        console.log('k: ',k," v: ",v);
        this.id.push(k)
        console.log(': ',this.formConfig[this.id[0]])
        this.buildForm(this.formConfig[k].controls,k)
      })
      // this.buildForm(this.formConfig?.pageOne.controls);
      // this.buildForm(this.formConfig?.pageTwo.controls);
      // this.buildForm(this.formConfig?.pageThree.controls);
    })
  }
  buildForm(controls: any[],pageKey?:any) {
    let validatorsToAdd=[];
    const formGroup = this.formBuilder.group({});
    for (const ele of controls) {     
      if (ele.type !== 'button') {
        let key,value:any;
        for ([key, value] of Object.entries(ele.validators)) {   
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
        formGroup.addControl(ele.name, this.formBuilder.control(ele.value,validatorsToAdd));
        // this.formArray.push(formGroup)
        if(pageKey){
          // this.stateName[pageKey]=this.formArray
          console.log("state val: ",this.stateName,pageKey);
        }
               
      }
    }
    console.log('fff: ',this.myForm);
  }
  onSubmit(){
    console.log("submit");
    
    console.log('submit: ',this.myForm.value)
  }
  statusPass(name:any):FormControl{
    
    return this.myForm.get(name) as FormControl
  }
  errorMsgPass(data:any){
    return data
  }
  stepperState(data:any,key:any){
    return data
  }
}
