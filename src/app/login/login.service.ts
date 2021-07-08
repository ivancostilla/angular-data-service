import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import * as firebase from 'firebase';
@Injectable()
export class LoginService{

  token: string;

  constructor(
    private router: Router
  ){}

  login(email:string,password:string){
    //pasamos como params el email y el password
    firebase.default.auth().signInWithEmailAndPassword(email,password)
    .then(
      //con la respuesta hacemos una llamada para obtener el token
      (response) => {
        firebase.default.auth().currentUser?.getIdToken()
        .then(
          (token) => {
            //guardamos el token en la variable que declaramos arriba
            this.token = token;

            //una vez obtenemos el token nos redirigimos a la pagina de inicio
            this.router.navigate(['/']);
          }
        )
      }
    )
  }

  //con esto lo podemos sar en distintas paginas
  getToken(){
    return this.token;
  }

  //para saber si estamos logueados o no:
  isAutenticado(){
    return this.token != null;
  }

  //logOut
  logout(){
    firebase.default.auth().signOut().then(()=>{
      this.token = null;
      this.router.navigate(['login']);
    }). catch(error => console.log(error))
  }
}
