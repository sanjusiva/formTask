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
  }
export interface JsonForm {
    controls: JsonFormConfig[];
    additionalDetails:any[]
  }