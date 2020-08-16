import {Component, OnInit} from '@angular/core';
import {Encuesta} from "../../personas/encuesta";

@Component({
  selector: 'app-encuesta-crear',
  templateUrl: './encuesta-crear.component.html',
  styleUrls: ['./encuesta-crear.component.css']
})
export class EncuestaCrearComponent implements OnInit {

  constructor() {
  }

  public Encuesta: Encuesta = new Encuesta();
  tipo_pregunta: String = 'Respuesta Simple';
  divs: number[] = [0];

  ngOnInit(): void {
  }

  tipos = ['Respuesta Simple', 'Parrafo', 'Opcion Multiple', 'Casillas de Verificacion', 'Escala Lineal'];

  agregarPregunta(){
    this.divs.push(this.divs.length);
  }
}
