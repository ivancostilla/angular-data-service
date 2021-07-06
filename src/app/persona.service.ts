import { EventEmitter, Injectable } from '@angular/core';
import { LoggingService } from './LoggingService.service';
import { Persona } from './persona.model';

//para injectar 1 servicio dntro de otro:
@Injectable()
export class PersonasService {
  personas: Persona[] = [
    new Persona('Juan', 'Perez'),
    new Persona('Laura', 'Juarez'),
  ];

  //comunicacion entre componentes usando servicios
  saludar = new EventEmitter<number>();
  //inyeccion de servicios dentro de otros servicios
  constructor(private LoggingService: LoggingService){}

  agregarPersona(persona: Persona) {
    this.LoggingService.enviaMensajeAConsola('agregamos persona :' + persona.nombre+ " " + persona.apellido)
    this.personas.push(persona);
  };

  encontrarPersona(index:number){
    //devolvemos la persona ubicada en el index que enviamos
    let persona: Persona = this.personas[index];
    return persona;
  };

  modificarPersona(index:number,persona:Persona){
    //editar persona q ya existe
    let persona1 = this.personas[index];
    persona1.nombre = persona.nombre;
    persona1.apellido = persona.apellido;
  };

  eliminarPersona(index:number){
    this.personas.splice(index,1);
  };
}
