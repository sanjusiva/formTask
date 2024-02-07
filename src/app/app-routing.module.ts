import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorDisplayComponent } from './error-display/error-display.component';
import { FormValidationComponent } from './form-validation/form-validation.component';
import { FormComponent } from './form/form.component';
import { LoaderComponent } from './loader/loader.component';
import { StepperFormComponent } from './stepper-form/stepper-form.component';

const routes: Routes = [
  {path:'form',component:FormComponent},
  {path:'formVali',component:FormValidationComponent},
  // {path:'',redirectTo:'form',pathMatch:'full'},
  {path:'load',component:LoaderComponent},
  {path:'step',component:StepperFormComponent},
  {path:'lib',component:ErrorDisplayComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
