import {Component, OnInit} from '@angular/core';
import {Encuesta} from "../../personas/encuesta";
import {ActivatedRoute, Router} from "@angular/router";
import {EncuestasService} from "../../services/encuestas.service";
import { IRespuesta, RespuestasService } from "../../services/respuestas.services";



@Component({
  selector: 'app-encuesta-solve',
  templateUrl: './encuesta-solve.component.html',
  styleUrls: ['./encuesta-solve.component.css']
})
export class EncuestaSolveComponent implements OnInit {

  public encuesta: Encuesta = new Encuesta();
  public usuarioId: number = JSON.parse(sessionStorage.getItem("persona")).id;

  respuestasMap: {
    [key: number]: {
      [key: number]: IRespuesta
    }
  } = {};

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private encuestaService: EncuestasService,
              private respuestaService: RespuestasService) {
  }

  ngOnInit(): void {
    this.cargarEncuesta();
  }

  cargarEncuesta(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params ['id']
      if (id) {
        this.encuestaService.getEncuesta(id).subscribe((encuesta) => {
          // initialize respuestasMap
          encuesta.preguntas.forEach(p => {
            this.respuestasMap[p.id] = {};
            p.opciones.forEach(o => {
              this.respuestasMap[p.id][o.id] = {};
            })
          });
          this.encuesta = encuesta;
          console.log(encuesta)
        })
      }
    })
  }


  onSubmit() {
    // para que veas la estructura del map
    console.log('respuestasMap', this.respuestasMap);
    const respuestas = this.convertRespuestaMapToArrayRespuesta(this.respuestasMap);
    // para que veas como quedo el map despues de la conversion
    console.log('respuestas', respuestas);
    this.respuestaService.saveAllRespuetas(respuestas).subscribe(resp => {
      // do something here
    })
  }


  private convertRespuestaMapToArrayRespuesta(respuestasMap): Array<IRespuesta> {
    const respuestas: Array<IRespuesta> = [];

    Object.keys(respuestasMap).forEach(preguntaId => {
      const pregunta = respuestasMap[preguntaId];
      Object.keys(pregunta).forEach(opcionId => {
        // clono la opcion para no tocar los valores de respuestasMap
        const respuesta: IRespuesta = Object.assign({}, respuestasMap[preguntaId][opcionId]);
        // si la respuesta no esta vacia, la incluyo en el array de respuestas
        // para las casillas debido al checbox opcionId es un booleano, true si ha sido seleccionado, false | undefined si no fue selecionado
        // con el IF nos aseguramos solo seleccionar aquellas casillas seleccionadas = true
        if (respuesta.textValue || respuesta.numValue || respuesta.opcionId ) {
          // sostituimos opcionId porque podria ser boolean debido a las casillas.
          respuesta.opcionId = Number(opcionId);
          respuesta.preguntaId = Number(preguntaId);
          respuesta.usuarioId = this.usuarioId;
          respuestas.push(respuesta);
        }
      });
    });

    return respuestas;
  }



}
