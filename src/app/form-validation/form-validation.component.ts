import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-form-validation',
  templateUrl: './form-validation.component.html',
  styleUrls: ['./form-validation.component.css']
})
export class FormValidationComponent implements OnInit{
  public myForm: FormGroup = this.formBuilder.group({});
  public myFormData:any
  selectedValue: any;
  idProof: undefined;

  constructor(private service:ApiService,private formBuilder:FormBuilder){}
  ngOnInit(){
    this.service.getFormField().subscribe((res)=>{
      console.log(res)
      this.myFormData=res
      this.buildForm(this.myFormData?.controls);

    })
  }
  //use onOtherDrop function because we need to write removeControl logic over there
  onDropdownChange(event:any,name:any){
    console.log('drop: ', event.target.value, name," v: ",this.myForm.get(event.target.value)?.value);
    console.log("e: ",event," n: ",name,event.target.value , this.selectedValue);
    if (
      event.target.value !== this.selectedValue &&
      this.selectedValue !== undefined
    ) {
      this.myForm.removeControl(this.selectedValue);
    }
    this.selectedValue = event.target.value;
    this.myForm.get(name)?.setValue(this.selectedValue);

    this.myFormData.additionalDetails.forEach((key:any) => {
      Object.values(key).forEach((val: any) => {
        val.forEach((e: any) => {
          if (this.selectedValue) {
            if (this.selectedValue === e.name) {
              console.log('val drop: ', val);

              this.buildForm(val);
            }
          } else {
            this.myForm.removeControl('additionalDetails');
          }
        });
      });
    });
    
  }
  onOthersDropdownChange(event: any, name: any) {
    console.log('2 drop: ',event.target.value,name)
    if (this.idProof !== undefined && this.idProof !== event.target.value) {
      this.myForm.removeControl(this.idProof);
    }
    this.idProof = event.target.value;
    // console.log("lllooogg drop: ",this.idProof,this.myFormData);
    this.myFormData.additionalDetails.forEach((key:any) => {
    // console.log("lllooogg drop: ",key);
      Object.values(key).forEach((val: any) => {
    console.log("lllooogg drop: ",val);
        val.forEach((e: any) => {
    // console.log("lllooogg drop: ",e.name,this.idProof);
          if (this.idProof) {
            if (this.idProof === e.name) {
              console.log('val drop: ', val);

              this.buildForm(val);
            }
          } else {
            this.myForm.removeControl('additionalDetails');
          }
        });
      });
    });

    // this.myFormData.additionalDetails.forEach((key:any) => {
    //   console.log("lllooogg: ",this.idProof,key);

      // Object.values(key).forEach((val: any) => {
      //   val.forEach((e: any) => {
      //     if (this.selectedValue === e.name) {
      //       // Object.values(e).forEach((w: any) => {
              
      //         // if (e[this.idProof][0].name == this.idProof) {
      //         //   this.buildForm(e[this.idProof]);
      //         // }
      //       // });
      //     }
      //   });
      // });
    // });
  }
  statusPass(name: any): FormControl {
    console.log('mm status pass: ', name);

    return this.myForm.get(name) as FormControl;
  }
  errorMsgPass(data: any) {
    console.log('data msg: ', data);
    return data;
  }
  getAdditionalDetails(control: any, id?: any) {
    console.log('!!!: ', control, id);
    let res;
    // if (id) {
    //   return control;
    // }
    Object.values(control).forEach((val: any) => {
      val.forEach((e: any) => {
    console.log('res !!!: ',e,this.selectedValue);  
        if (e.name === this.selectedValue) {
          res = val;
          return val;
        }
      });
    });
    // console.log('res !!!: ',res);  
    return res;
  }
  buildForm(controls: any[], otherId?: any) {
    let validatorsToAdd = [];
    for (const ele of controls) {
      if (ele.type !== 'button') {
        let key;
        let value:any;
        for ([key, value] of Object.entries(ele.validators)) {
          console.log('check key', key, ele.name);

          switch (key) {
            case 'required':
              if (value) {
                validatorsToAdd.push(Validators.required);
              }
              break;
            case 'pattern':
              console.log('mt keyyyy: ', key, ele);
              if (value) {
                validatorsToAdd.push(Validators.pattern(value));
              }
              break;
          }
        }
        console.log('fff vali: ', ele.value, validatorsToAdd);
        this.myForm.addControl(
          ele.name,
          this.formBuilder.control(ele.value, validatorsToAdd)
        );
      }
    }
    console.log('fff: ', this.myForm);
  }
  onSubmit(){
    console.log('submit: ',this.myForm.value)
  }
}
