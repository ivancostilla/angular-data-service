import { EventEmitter, Injectable } from '@angular/core';
import { LoggingService } from './LoggingService.service';
import { Persona } from './persona.model';
import { DataServices } from './data.services';

//para injectar 1 servicio dntro de otro:
@Injectable()
export class PersonasService {
  personas: Persona[] = [];

  //inyeccion de servicios dentro de otros servicios
  constructor(private loggingService: LoggingService,
              private dataServices: DataServices
      ){}
  //comunicacion entre componentes usando servicios
  saludar = new EventEmitter<number>();


  setPersonas(personas: Persona[]){
    this.personas = personas;
  }

  obtenerPersonas(){
    return this.dataServices.cargarPersonas();
  }

  agregarPersona(persona: Persona) {
    this.loggingService.enviaMensajeAConsola('agregamos persona :' + persona.nombre+ " " + persona.apellido)
    //por si el arreglo no tiene datos en la bbdd lo iniciamos vacio y
    //evitamos el error null
    if(this.personas === null){
      this.personas = []
    }
    this.personas.push(persona);
    this.dataServices.guardarPersonas(this.personas)
    //Si se guarda solo un elemento se debe trabajar cada indice y regenerarlos con cada modificacion
    //this.dataService.guardarPersona(persona, this.personas.length);

  };

  encontrarPersona(index:number){
    //devolvemos la persona ubicada en el index que enviamos
    let persona: Persona = this.personas[index];
    this.loggingService.enviaMensajeAConsola("persona encontrada:" + persona);
    return persona;
  };

  modificarPersona(index:number,persona:Persona){
    this.loggingService.enviaMensajeAConsola("persona a modificar:" + persona + " con indice:" + index);
    //editar persona q ya existe
    let persona1 = this.personas[index];
    persona1.nombre = persona.nombre;
    persona1.apellido = persona.apellido;

    this.dataServices.modificarPersona(index,persona);
  };

  modificarPersonas(){
    this.loggingService.enviaMensajeAConsola("modificar todas las personas:");
    if(this.personas != null)
        //Guarda todas las personas nuevamente para regenerar indicess
        this.dataServices.guardarPersonas(this.personas);
  }

  eliminarPersona(index:number){
    this.loggingService.enviaMensajeAConsola("eliminar persona con indice: " + index);
    this.personas.splice(index,1);
    this.dataServices.eliminarPersona(index);
    //Se vuelven a guardar todas las personas para que coincida el indice con el arreglo en memoria
    this.modificarPersonas();
}
}
