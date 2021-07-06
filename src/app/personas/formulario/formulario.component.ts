import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoggingService } from '../../LoggingService.service';
import { Persona } from '../../persona.model';
import { PersonasService } from '../../persona.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent  {

  nombreInput:string;
  apellidoInput:string;

  constructor(private loggingService:LoggingService,
    private personaService:PersonasService,
    private router:Router
    ){
  //comunicacion entre componentes usando servicios:
      this.personaService.saludar.subscribe( (indice: number) => {
        alert(indice)
      })
    }

  onGuardarPersona(){
    let persona1 = new Persona(
      this.nombreInput,
      this.apellidoInput);
    //this.loggingService.enviaMensajeAConsola('Enviamos persona con nombre:' + persona1.nombre + ', apellido:' + persona1.apellido);
    //this.personaCreada.emit(persona1);
    this.personaService.agregarPersona(persona1);
    this.router.navigate(['personas'])
  }

}
