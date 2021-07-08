import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { LoginGuardian } from './login/login-guardian.service';
import { LoginComponent } from './login/login.component';
import { FormularioComponent } from './personas/formulario/formulario.component';
import { PersonasComponent } from './personas/personas.component';

const routes: Routes = [
  //protegemos las paginas donde el usuario no hizo login con loginguardian
  {path:'', component: PersonasComponent, canActivate:[LoginGuardian]},
  {path:'personas', component: PersonasComponent,canActivate:[LoginGuardian],
   children:[
    {path:'agregar', component: FormularioComponent},
    {path:':id', component: FormularioComponent},
  ]},
  {path:'login', component: LoginComponent},
  //componente error
  {path:'**', component: ErrorComponent},

]
@NgModule({
  imports: [RouterModule.forRoot(
    routes
   )
 ],
 exports: [RouterModule]
})
export class AppRoutingModule { }
