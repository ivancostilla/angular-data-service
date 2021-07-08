import { Component, ElementRef, EventEmitter, Output, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataServices } from 'src/app/data.services';
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
  modoEdicion:number;
  constructor(
    private loggingService:LoggingService,
    private personaService:PersonasService,
    private router:Router,
    private route:ActivatedRoute,
    ){
  //comunicacion entre componentes usando servicios:
      this.personaService.saludar.subscribe( (indice: number) => {
        alert(indice)
      })
    }
    ngOnInit() {
      this.index = this.route.snapshot.params['id'];
      this.modoEdicion = +this.route.snapshot.queryParams['modoEdicion'];
      if(this.modoEdicion!= null && this.modoEdicion == 1){
        let persona:Persona = this.personaService.encontrarPersona(this.index);
        if(persona != null){
          //Cargamos los valores en el formulario solo si hay un index (un registro a editar)
          this.nombreInput = persona.nombre;
          this.apellidoInput = persona.apellido;
        }
      }
    }

    onGuardarPersona(){
      if(this.nombreInput != null && this.apellidoInput != null){
        let persona1:Persona = new Persona(this.nombreInput, this.apellidoInput);
        if(this.modoEdicion!= null && this.modoEdicion == 1){
          this.personaService.modificarPersona(this.index, persona1);
        }
        else{
          this.personaService.agregarPersona(persona1);
        }
        this.loggingService.enviaMensajeAConsola("persona agregada/modificada:" + persona1.toString());
        this.router.navigate(['personas']);
      }
      else{//si no tiene datos no hace nada se queda en el mismo lugar
        return;
      }

    }

    eliminarPersona(){
      if(this.index != null){
        this.personaService.eliminarPersona(this.index)
      }
      this.router.navigate(['personas']);
    }
}
