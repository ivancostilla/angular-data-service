import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Persona } from './persona.model';
//inyectar servicios dentro de otros servicios
@Injectable()

export class DataServices{
  constructor(
    private httpClient: HttpClient
    ){}
    cargarPersonas(){
      return this.httpClient.get<Persona[]>('https://angular-8d501-default-rtdb.firebaseio.com/datos.json');
    }
    //guardar personas
    guardarPersonas(personas: Persona[]){
      this.httpClient.put('https://angular-8d501-default-rtdb.firebaseio.com/datos.json',personas)
      .subscribe(
        response => {
          console.log(response)
        },
        error => {
          console.log(error)
        }
      )
    }
  }
