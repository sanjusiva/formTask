interface FormValidators {
  required?: boolean;
}
export interface JsonFormConfig {
    name: string;
    label: string;
    value: string;
    type: string;
    options?: any;
    // required: boolean;
    validators: FormValidators;
    school?:any;
    clg?:any;
  }
export interface JsonForm {
    controls: JsonFormConfig[];
    additionalDetails:any[]
  }