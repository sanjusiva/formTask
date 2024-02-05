import { HttpClient } from '@angular/common/http';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { JsonForm, JsonFormConfig } from '../interface/form.interface';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css'],
})
export class DynamicFormComponent implements OnChanges, OnInit {
  @Input() myFormData!: JsonForm;
  public myForm: FormGroup = this.formBuilder.group({});
  public selectedValue: string | undefined;
  public idProof: any;
  constructor(private formBuilder: FormBuilder, private http: HttpClient) {}
  ngOnInit(): void {
    console.log('fc: ', this.myForm);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes['myFormData'].firstChange) {
      console.log('inside on change');

      this.buildForm(this.myFormData?.controls);
      console.log('val: ', this.myFormData);
    }
  }

  buildForm(controls: JsonFormConfig[], otherId?: any) {
    let validatorsToAdd = [];
    for (const ele of controls) {
      if (ele.type !== 'button') {
        for (const [key, value] of Object.entries(ele.validators)) {
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

  onDropdownChange(event: any, name: any) {
    console.log('drop: ', event.target.value, name," v: ",this.myForm.get(event.target.value)?.value);

    if (
      event.target.value !== this.selectedValue &&
      this.selectedValue !== undefined
    ) {
      this.myForm.removeControl(this.selectedValue);
    }
    this.selectedValue = event.target.value;
    this.myForm.get(name)?.setValue(this.selectedValue);

    this.myFormData.additionalDetails.forEach((key) => {
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
    this.myFormData.additionalDetails.forEach((key) => {
      Object.values(key).forEach((val: any) => {
        val.forEach((e: any) => {
          if (this.selectedValue === e.name) {
            Object.values(e).forEach((w: any) => {
              if (e[this.idProof][0].name == this.idProof) {
                this.buildForm(e[this.idProof]);
              }
            });
          }
        });
      });
    });
  }

  onSubmit() {
    console.log('submit: ', this.myForm.value);
  }
  getAdditionalDetails(control: any, id?: any) {
    console.log('!!!: ', control, id);
    let res;
    if (id) {
      return control;
    }
    Object.values(control).forEach((val: any) => {
      val.forEach((e: any) => {
        if (e.name === this.selectedValue) {
          res = val;
          return val;
        }
      });
    });
    return res;
  }

  // errorMsgPass(name:any,control?:any,data?:any){
  //   let msg;
  //   console.log('mm val status: ',this.myFormData.controls,name,this.selectedValue,control);
  //   if(control){
  //     console.log("mm ele: ",this.myFormData.additionalDetails);

  //     for(let ele of this.myFormData.additionalDetails){
  //       console.log("mm ele: ",ele);
  //       let eKey:any;
  //       let eVal:any;
  //       for([eKey,eVal] of Object.entries(ele)){
  //         if(eKey===name){
  //           msg=eVal[0].validationMsg
  //         }
  //         console.log('mm scl: ',eVal[0][name],data.validationMsg)
  //         // if(eVal[0]?.name)
  //         // for(let item of eVal[0][name]){
  //         // console.log('mm scl item: ',item)
  //         // }
  //         console.log("mm val: ",eKey,eVal[0].validationMsg);
  //       }
  //       if(ele.name===name){
  //         console.log('mm e ele if: ',ele.validationMsg);
  //         msg=ele.validationMsg
  //       }
  //     }
  //   }
  //   else{
  //     for(let ele of this.myFormData.controls){
  //       if(ele.name===name){
  //         console.log('mm e ele else: ',ele.validationMsg);
  //         msg=ele.validationMsg
  //       }
  //     }
  //   }
  //   console.log("fff mm: ",msg  )
  //   return msg
  // }
  statusPass(name: any): FormControl {
    console.log('mm status pass: ', name);

    return this.myForm.get(name) as FormControl;
  }
  errorMsgPass(data: any) {
    console.log('data msg: ', data);
    return data;
  }
}

// export class DynamicFormComponent implements OnInit{
//   @Input() myFormData!: any;
//   public myForm: FormGroup = this.formBuilder.group({});
//   constructor(private service:ApiService,private formBuilder:FormBuilder){}

//   ngOnInit(){
//     this.service.getFormField().subscribe((res)=>{
//       console.log(res)
//       this.myFormData=res
//       this.buildForm(this.myFormData?.controls);

//     })
//   }
//   onDropdownChange(event:any,name:any){
//     console.log("e: ",event," n: ",name);
    
//   }
//   buildForm(controls: any[], otherId?: any) {
//     let validatorsToAdd = [];
//     for (const ele of controls) {
//       if (ele.type !== 'button') {
//         for (const [key, value] of Object.entries(ele.validators)) {
//           console.log('check key', key, ele.name);

//           switch (key) {
//             case 'required':
//               if (value) {
//                 validatorsToAdd.push(Validators.required);
//               }
//               break;
//             // case 'pattern':
//             //   console.log('mt keyyyy: ', key, ele);
//             //   if (value) {
//             //     validatorsToAdd.push(Validators.pattern(value));
//             //   }
//             //   break;
//           }
//         }
//         console.log('fff vali: ', ele.value, validatorsToAdd);
//         this.myForm.addControl(
//           ele.name,
//           this.formBuilder.control(ele.value, validatorsToAdd)
//         );
//       }
//     }
//     console.log('fff: ', this.myForm);
//   }
//   onSubmit(){
//     console.log('submit: ',this.myForm.value)
//   }
  
// }