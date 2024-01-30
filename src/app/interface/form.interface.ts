interface FormValidators {
  required?: boolean;
  pattern?:string;
  patternMsg?:string
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
    error?:boolean;
    msg?:string
  }
export interface JsonForm {
    controls: JsonFormConfig[];
    additionalDetails:any[]
  }