import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ChangeDetectionStrategy,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { JsonForm, JsonFormConfig } from '../interface/form.interface';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css'],
})
export class DynamicFormComponent implements OnChanges,OnInit{
  @Input() myFormData!: JsonForm;
  public myForm: FormGroup = this.formBuilder.group({});
  public selectedValue: string | undefined;
  public idProof:any;
  constructor(private formBuilder: FormBuilder, private http: HttpClient) {}
  ngOnInit(): void {
    console.log('fc: ',this.myForm);
  }
  
  ngOnChanges(changes: SimpleChanges) {
    if (!changes['myFormData'].firstChange) {
      console.log('inside on change');
      
      this.buildForm(this.myFormData?.controls);
      console.log('val: ',this.myForm.get('firstName'));
    }
  }
  buildForm(controls: JsonFormConfig[],otherId?:any) {
    
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
            case 'pattern':
              validatorsToAdd.push(Validators.pattern(value));
              break;
          }
        }
        this.myForm.addControl(ele.name, this.formBuilder.control(ele.value,validatorsToAdd));
        
      }
    }
    
    
  }

  onDropdownChange(event: any, name: any) {
    
    
    if(event.target.value!==this.selectedValue && this.selectedValue!==undefined){
      
      this.myForm.removeControl(this.selectedValue);
    }
    this.selectedValue = event.target.value;
    this.myForm.get(name)?.setValue(this.selectedValue);
        
        
        this.myFormData.additionalDetails.forEach((key)=>{
        
        Object.values(key).forEach((val:any)=>{
          
          val.forEach((e:any)=>{
              
               if (this.selectedValue) {
                
      if (this.selectedValue ===e.name) {
        
        this.buildForm(val);
      } 
      
    }
     else {
      
      this.myForm.removeControl('additionalDetails');
    }
          })
        })
        })
  }

  onOthersDropdownChange(event: any, name: any) {
    
    if(this.idProof!==undefined && this.idProof!==event.target.value){
      this.myForm.removeControl(this.idProof);
    }
    this.idProof=event.target.value
    this.myFormData.additionalDetails.forEach((key)=>{
      
      Object.values(key).forEach((val:any)=>{
        
        val.forEach((e:any)=>{
            
    if (this.selectedValue ===e.name) {
      Object.values(e).forEach((w:any)=>{   
        if(e[this.idProof][0].name==this.idProof){
          this.buildForm(e[this.idProof]);
        }
      })
    } 
        })
      })
      })

  }

  onSubmit() {
    console.log(this.myForm.value)
  }
  getAdditionalDetails(control: any,id?:any) {
    
    let res;
    if(id){
      return control
    }
      Object.values(control).forEach((val:any)=>{
        val.forEach((e:any)=>{
          if(e.name===this.selectedValue){
            
            res=val
            return val
          }
        })
      })
      return res
  }

  statusPass(name:any):FormControl{
    // console.log('val status: ',this.myForm.get(name));
    return this.myForm.get(name) as FormControl
  }
}
