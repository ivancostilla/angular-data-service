import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
  }

  login(form: NgForm){
    const email = form.value.email;
    const password = form.value.password;
    //enviamos la info puesta en los inputs html hacia al servicio
    //que tiene las funciones para iniciar sesión
    this.loginService.login(email,password)
  }
}
