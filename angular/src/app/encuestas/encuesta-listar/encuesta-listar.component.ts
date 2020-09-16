import { Component, OnInit } from '@angular/core';
import {EncuestasService} from "../../services/encuestas.service";
import {Encuesta} from "../../personas/encuesta";

@Component({
  selector: 'app-encuesta-listar',
  templateUrl: './encuesta-listar.component.html',
  styleUrls: ['./encuesta-listar.component.css']
})
export class EncuestaListarComponent implements OnInit {
  encuestas: Encuesta[];

  public color: string = 'lightblue';
  constructor(private encuestaService: EncuestasService) { }

  ngOnInit(): void {
    this.cargarEncuestasPublicas();
  }

  cargarEncuestasPublicas(){
    this.encuestaService.getAllPublicEncuestas().subscribe(response=>{
      this.encuestas=response;
      console.log(this.encuestas)
    });
  }

}
