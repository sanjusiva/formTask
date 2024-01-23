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
    }
    console.log('f: ', this.myForm);
  }

  onDropdownChange(event: any, name: any) {
    console.log('e: ', event, ' name: ', name);
    this.selectedValue = event.target.value;
    this.myForm.get(name)?.setValue(this.selectedValue);
    if (this.selectedValue && name == 'Id Proof') {
      this.buildForm(this.myFormData?.additionalDetails);
      console.log(this.myForm);
    } else {
      this.myForm.removeControl('additionalDetails');
    }
  }

  onOthersDropdownChange(event: any) {
    console.log('other: ', this.myForm);
  }

  onSubmit() {
    console.log('Name', this.myForm.value);
  }
}
