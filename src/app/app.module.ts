import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { FormComponent } from './form/form.component';
import { LoaderComponent } from './loader/loader.component';
import { LoaderInterceptor } from './service/loader.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { FieldValidationDirective } from './service/field-validation.directive';
import { ErrorDisplayComponent } from './error-display/error-display.component';
import { StepperFormComponent } from './stepper-form/stepper-form.component';
import { MatStepperModule } from '@angular/material/stepper'
import { MatSidenavModule } from '@angular/material/sidenav'
import {MatListModule} from '@angular/material/list'

@NgModule({
  declarations: [
    AppComponent,
    DynamicFormComponent,
    FormComponent,
    LoaderComponent,
    FieldValidationDirective,
    ErrorDisplayComponent,
    StepperFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatStepperModule,
    MatSidenavModule,
    MatListModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
