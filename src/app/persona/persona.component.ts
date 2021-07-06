import { PersonasService } from './../persona.service';
import { Component, Input, OnInit } from '@angular/core';
import { Persona } from '../persona.model';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {

  @Input() persona: Persona;
  @Input() indice: number;

  constructor(private PersonasService: PersonasService) { }

  ngOnInit(): void {
  }

  //comunicacion entre componentes usando servicios
  emitirSaludo(){
    this.PersonasService.saludar.emit(this.indice)
  }

}
