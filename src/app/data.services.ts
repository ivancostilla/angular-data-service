import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Persona } from './persona.model';
//inyectar servicios dentro de otros servicios
@Injectable()

export class DataServices{
  constructor(private httpClient: HttpClient){}
    cargarPersonas(){
      return this.httpClient.get<Persona[]>('https://angular-8d501-default-rtdb.firebaseio.com/datos.json');
    }
    //guardar personas
    guardarPersonas(personas: Persona[]){
      this.httpClient.put('https://angular-8d501-default-rtdb.firebaseio.com/datos.json',personas)
      .subscribe(
        (response) => {
          console.log(response)
        },
        (error) => {
          console.log(error)
        }
      )
    }

    modificarPersona(index:number, persona:Persona){
      let url: string;
      url = 'https://angular-8d501-default-rtdb.firebaseio.com' + '/datos/' + index + '.json';
      console.log("url de modificarPersona:" + url);
      this.httpClient.put( url, persona)
          .subscribe(
              (response) => {
                  console.log("resultado modificar Persona: " + response);
              },
              (error) => console.log("Error en modificar Persona: " + error)
          );
    }
    
    eliminarPersona(index:number){
      let url: string;
      url = 'https://angular-8d501-default-rtdb.firebaseio.com' + '/datos/' + index + '.json';
      console.log("url de eliminarPersona:" + url);
      this.httpClient.delete( url)
          .subscribe(
              (response) => {
                  console.log("resultado eliminar Persona: " + response);
              },
              (error) => console.log("Error en eliminar Persona: " + error)
          );
  }
  }
