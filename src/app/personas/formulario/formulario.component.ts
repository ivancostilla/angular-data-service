import { Component, ElementRef, EventEmitter, Output, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoggingService } from '../../LoggingService.service';
import { Persona } from '../../persona.model';
import { PersonasService } from '../../persona.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit  {

  nombreInput:string;
  apellidoInput:string;
  index:number;
  constructor(private loggingService:LoggingService,
    private personaService:PersonasService,
    private router:Router,
    private route:ActivatedRoute
    ){
  //comunicacion entre componentes usando servicios:
      this.personaService.saludar.subscribe( (indice: number) => {
        alert(indice)
      })
    }
    ngOnInit(){
      //obtenemos la info entre rutas
      //este id viene de app-routing
      this.index = this.route.snapshot.params['id']
      if(this.index){
        //si el index existe quere decir que:
        //1- estamos en el modo edicion
        //2 enviamos el index al apretar el boton, lo recibimos
        //en ngOninit y lo enviamos al servicion qu tiene el metodo
        let persona: Persona = this.personaService.encontrarPersona(this.index);

        this.nombreInput = persona.nombre;
        this.apellidoInput = persona.apellido;
      }
    }

  onGuardarPersona(){
    let persona1 = new Persona(
      this.nombreInput,
      this.apellidoInput
      );
      if(this.index){
        this.personaService.modificarPersona(this.index, persona1)
      } else {
        //this.loggingService.enviaMensajeAConsola('Enviamos persona con nombre:' + persona1.nombre + ', apellido:' + persona1.apellido);
        //this.personaCreada.emit(persona1);
        this.personaService.agregarPersona(persona1);
      }

    //navegamos hacia la ruta 'personas'
    this.router.navigate(['personas'])
  }

}
