import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Directive({
  selector: '[appFieldValidation]',
})
export class FieldValidationDirective {
  @Input() fieldInput!: FormControl;
  @Input() errorMsg!: any;

  constructor(private e: ElementRef) {}

  @HostListener('click')
  onClickEvent() {
    this.fieldValidation();
  }
  @HostListener('blur')
  onBlurEvent() {
    this.fieldValidation()
  }

  fieldValidation(){
      console.log('mt: ',this.fieldInput);
      
      let msg = document.getElementById('errorMsg');
      
      if (this.fieldInput.errors && this.fieldInput.errors['required']) {
        console.log('val status uh: ',this.fieldInput.errors['required'],this.fieldInput.touched,msg);
        if (this.fieldInput.errors['required'] && this.fieldInput.touched) {
          if (msg !== null) {

            msg.innerHTML = "this.fieldInput.errors['message']";
            // let message="validationMsg['required']"
            // console.log('ce: ',this.fieldInput.setErrors({'required':true,'message':'req'}));
            
          }
        }
      }
      console.log('mt1: ',this.fieldInput);
      this.fieldInput.statusChanges.subscribe((status) => {
        console.log("status: ",status,msg);
        
        if (msg !== null) {
        console.log("status msg: ",status,msg);
  
          if (status == 'INVALID') {
        console.log("status if: ",status,msg);
  
            msg.innerHTML = 'invalid';
          } 
          else {
            if (msg !== null) {
            msg.innerHTML = '';
              // msg.remove();
            }
          }
        }
      });
    }
}
