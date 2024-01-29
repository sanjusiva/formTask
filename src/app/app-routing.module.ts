import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './form/form.component';
import { LoaderComponent } from './loader/loader.component';

const routes: Routes = [
  {path:'form',component:FormComponent},
  {path:'',redirectTo:'form',pathMatch:'full'},
  {path:'load',component:LoaderComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
