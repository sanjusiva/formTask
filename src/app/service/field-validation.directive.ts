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
        if (this.fieldInput.errors['required'] == this.fieldInput.touched) {
          if (msg !== null) {
            msg.innerHTML = 'req';
          }
        }
      }
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
