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
  constructor(private formBuilder: FormBuilder, private http: HttpClient) {}
  ngOnChanges(changes: SimpleChanges) {
    if (!changes['myFormData'].firstChange) {
      console.log('data: ', this.myFormData);
      this.buildForm(this.myFormData?.controls);
    }
  }
  buildForm(controls: JsonFormConfig[]) {
    console.log('build : ', controls);

    for (const ele of controls) {
      console.log('ele: ', ele);
      this.myForm.addControl(ele.name, this.formBuilder.control(ele.value));
      console.log('Form control added:', ele.name);
    }
    console.log('Form controls:', this.myForm.controls);
    console.log('f: ', this.myForm);
  }

  onDropdownChange(event: any, name: any) {
    console.log('e: ', event.target.value, ' name: ', name);
    this.selectedValue = event.target.value;
    this.myForm.get(name)?.setValue(this.selectedValue);
    console.log('ad: ', this.selectedValue);
    if (this.selectedValue) {
      if (this.selectedValue === 'aadhar') {
        console.log('a: ', this.myFormData.additionalDetails[0]['aadhar']);
        this.buildForm(this.myFormData.additionalDetails[0]['aadhar']);
      } else if (this.selectedValue === 'dl') {
        console.log('d: ', this.myFormData?.additionalDetails[1]['dl']);
        this.buildForm(this.myFormData?.additionalDetails[1]['dl']);
      } else if (this.selectedValue === 'others') {
        console.log('ingaaaaaaaaaaaaaaaaaaa');
        console.log('other: ', this.myFormData?.additionalDetails[2]);
        this.buildForm([this.myFormData?.additionalDetails[2]]);
      } 
      console.log(this.myForm);
    } else {
      this.myForm.removeControl('additionalDetails');
    }
  }

  onOthersDropdownChange(event: any, name: any) {
    console.log(
      'other: ',
      this.myFormData?.additionalDetails[2],
      ' name: ',
      name,
      ' e: ',
      event.target.value
    );
    this.myForm.get(name)?.setValue(event.target.value);
  }

  onSubmit() {
    console.log('Name', this.myForm.value);
  }
}
