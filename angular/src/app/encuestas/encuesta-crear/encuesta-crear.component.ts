import { Component, OnInit } from '@angular/core';
import { Encuesta } from "../../personas/encuesta";
import { Pregunta, TipoPreguntaEnum } from "../../personas/pregunta";

@Component({
  selector: 'app-encuesta-crear',
  templateUrl: './encuesta-crear.component.html',
  styleUrls: ['./encuesta-crear.component.css']
})
export class EncuestaCrearComponent implements OnInit {

  constructor() {
  }

  public encuesta: Encuesta = new Encuesta();

  ngOnInit(): void {
  }

  tipos = Object.keys(TipoPreguntaEnum).map(key => TipoPreguntaEnum[key]);

  agregarPregunta() {
    if (!this.encuesta.preguntas) {
      // en caso de encuesta nueva, inicializamos las preguntas.
      this.encuesta.preguntas = [];
    }
    const newPregunta = new Pregunta();
    // inicializamos el tipo de pregunta como default REPUESTA_SIMPLE
    newPregunta.tipo = TipoPreguntaEnum.RESPUESTA_SIMPLE;
    this.encuesta.preguntas.push(newPregunta);
  }

  salvarEncuesta() {
    console.log('encuesta DTO', this.encuesta);
  }
}
