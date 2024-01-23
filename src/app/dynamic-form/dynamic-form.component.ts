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
export class DynamicFormComponent implements OnChanges {
  @Input() myFormData!: JsonForm;
  public myForm: FormGroup = this.formBuilder.group({});
  public selectedValue: string | undefined;
  public idProof:any;
  constructor(private formBuilder: FormBuilder, private http: HttpClient) {}
  ngOnChanges(changes: SimpleChanges) {
    if (!changes['myFormData'].firstChange) {
      console.log('data: ', this.myFormData);
      this.buildForm(this.myFormData?.controls);
    }
  }
  buildForm(controls: JsonFormConfig[],otherId?:any) {
    console.log('build : ', controls,otherId);

    for (const ele of controls) {
      console.log('ele: ', ele);
      if (ele.type !== 'button') {
        ele.validators.required?this.myForm.addControl(ele.name, this.formBuilder.control(ele.value,Validators.required)):
        this.myForm.addControl(ele.name, this.formBuilder.control(ele.value));
        console.log('Form control added:', ele.name);
        if(otherId){
        if (ele.clg.name===otherId && otherId!==undefined) {
          console.log('n: ', ele.clg.name);
        ele.validators.required?this.myForm.addControl(ele.clg.name, this.formBuilder.control(ele.clg.value,Validators.required)):
          this.myForm.addControl(
            ele.clg.name,
            this.formBuilder.control(ele.clg.value)
          );
        console.log('Form control added:', ele.clg.name);

        } 
        else if (ele.school.name===otherId && otherId!==undefined) {
          console.log('n: ', ele.school.name);
        ele.validators.required?this.myForm.addControl(ele.school.name, this.formBuilder.control(ele.school.value,Validators.required)):
          this.myForm.addControl(
            ele.school.name,
            this.formBuilder.control(ele.school.value)
          );
        console.log('Form control added:', ele.school.name);
          
        }
      }
      }
    }
    console.log('Form controls:', this.myForm.controls);
    console.log('f: ', this.myForm);
  }

  onDropdownChange(event: any, name: any) {
    console.log('e: ', event.target.value, ' name: ', name);
    console.log('prev: ', this.selectedValue,"curr: ",event.target.value);
    if(event.target.value!==this.selectedValue && this.selectedValue!==undefined){
      console.log("change: ",this.selectedValue)
      this.myForm.removeControl(this.selectedValue);
    }
    this.selectedValue = event.target.value;
    this.myForm.get(name)?.setValue(this.selectedValue);
    if (this.selectedValue) {
      if (this.selectedValue === 'aadhar') {
        console.log('a: ', this.myFormData.additionalDetails[0]['aadhar']);
        this.buildForm(this.myFormData.additionalDetails[0]['aadhar']);
      } else if (this.selectedValue === 'dl') {
        console.log('d: ', this.myFormData?.additionalDetails[1]['dl']);
        this.buildForm(this.myFormData?.additionalDetails[1]['dl']);
      } 
      else if (this.selectedValue === 'others') {
        console.log('ingaaaaaaaaaaaaaaaaaaa: ',name);
        console.log('other: ', this.myFormData?.additionalDetails[2]);
        this.buildForm([this.myFormData?.additionalDetails[2]]);
      }
      console.log(this.myForm);
    }
     else {
      console.log("else kulla")
      this.myForm.removeControl('additionalDetails');
    }
  }

  onOthersDropdownChange(event: any, name: any) {
    console.log('ingaaaaaaaaaaaaaaaaaaa: ',name,event.target.value);
    if(this.idProof!==undefined && this.idProof!==event.target.value){
      this.myForm.removeControl(this.idProof);
    }
    this.idProof=event.target.value
    // this.myForm.get(name)?.setValue(event.target.value);
    // console.log("jk: ",[this.myFormData?.additionalDetails[2]])
    this.buildForm([this.myFormData?.additionalDetails[2]],this.idProof);

  }

  onSubmit() {
    console.log('Name', this.myForm.value);
  }
}
