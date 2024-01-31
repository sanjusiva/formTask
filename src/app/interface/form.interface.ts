interface FormValidators {
  required?: boolean;
  pattern?:string;
}
interface FormValidatorMsg {
  required?: string;
  pattern?:string;
}
export interface JsonFormConfig {
    name: string;
    label: string;
    value: string;
    type: string;
    options?: any;
    // required: boolean;
    validators: FormValidators;
    validationMsg:FormValidatorMsg;
    school?:any;
    clg?:any;
  }
export interface JsonForm {
    controls: JsonFormConfig[];
    additionalDetails:any[]
  }