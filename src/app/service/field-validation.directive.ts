import {
  Directive,
  ElementRef,
  HostListener,
  Input
} from '@angular/core';
import { FormControl } from '@angular/forms';

@Directive({
  selector: '[appFieldValidation]',
})
export class FieldValidationDirective {
  @Input() fieldInput!: FormControl;
  @Input() errorMsg!: any;
  @Input() name!: any;

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
      console.log('mt: ',this.fieldInput," em: ",this.errorMsg," name: ",this.name);
      
      let msg = document.getElementById(this.name);
      
      if (this.fieldInput.errors && this.fieldInput.errors['required']) {
        console.log('val status uh: ',this.fieldInput.errors['required'],this.fieldInput.touched,msg);
        if (this.fieldInput.errors['required'] && this.fieldInput.touched) {
          if (msg !== null) {

            msg.innerHTML = this.errorMsg.required;
            
          }
        }
      }
      console.log('mt1: ',this.fieldInput);
      this.fieldInput.statusChanges.subscribe((status) => {
        console.log("status change: ",status,msg);
        
        if (msg !== null) {
        console.log("status msg: ",status,msg);
  
          if (status == 'INVALID') {
        console.log("status if: ",status,msg);
        if (this.fieldInput.errors && this.fieldInput.errors['pattern']) {
            msg.innerHTML = this.errorMsg.pattern;
        }
          } 
          else {
            if (msg !== null) {
            msg.innerHTML = '';
            }
          }
        }
      });
    }
}
