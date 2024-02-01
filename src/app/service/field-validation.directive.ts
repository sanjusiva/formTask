import { Directive, ElementRef, HostListener, Input } from '@angular/core';
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
    this.fieldValidation();
  }

  fieldValidation() {
    let displayError = document.getElementById(this.name) as any;
    console.log(
      'mt: ',
      this.fieldInput,
      ' em: ',
      this.errorMsg,
      ' name: ',
      this.name
    );
    this.fieldInput.statusChanges.subscribe((status) => {
      for (let key in Object.keys(this.errorMsg.validators)) {
        if (displayError !== null) {
          let objKey = Object.keys(this.errorMsg.validators)[key];
          if (this.fieldInput.value === '') {
            displayError.innerHTML =
              this.errorMsg.validationMsg[
                Object.keys(this.errorMsg.validators)[0]
              ];
          } else if (status == 'INVALID') {
            console.log('invalid print: ', this.errorMsg.validationMsg[objKey]," objkey: ",objKey);
            displayError.innerHTML = this.errorMsg.validationMsg[objKey];
          } else {
            displayError.innerHTML = '';
          }
        } else {
          displayError.innerHTML = '';
        }
      }
    });
  }
}
