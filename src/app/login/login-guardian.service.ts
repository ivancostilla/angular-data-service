import { LoginService } from './login.service';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Injectable } from '@angular/core';

@Injectable()
export class LoginGuardian implements CanActivate{

  constructor(private loginService:LoginService,
    private router:Router){}

  canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot){
    //este metodo nos ayuda a ocultar paginas cuando no se esta logueado
    if(this.loginService.isAutenticado()){
      //si estamos logueados retornamos true
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
