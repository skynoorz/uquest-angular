import { Component, OnInit } from '@angular/core';
import { Encuesta } from "../../classes/encuesta";
import { ActivatedRoute, Router } from "@angular/router";
import { EncuestasService } from "../../services/encuestas.service";
import { IRespuesta, RespuestasService } from "../../services/respuestas.services";
import { TipoPreguntaEnum } from "../../classes/pregunta";
import Swal from "sweetalert2";
import { AuthService } from "../../usuarios/auth.service";


@Component({
  selector: 'app-encuesta-solve',
  templateUrl: './encuesta-solve.component.html',
  styleUrls: ['./encuesta-solve.component.css']
})
export class EncuestaSolveComponent implements OnInit {

  public encuesta: Encuesta = new Encuesta();
  // public usuarioId: number = JSON.parse(sessionStorage.getItem("persona")).id;
  public usuarioId: number;

  respuestasMap: {
    [key: number]: {
      [key: number]: IRespuesta
    }
  } = {};

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private encuestaService: EncuestasService,
              private respuestaService: RespuestasService,
              public authService: AuthService) {
  }

  ngOnInit(): void {
    // validacion si ya respondio anteriormente
    this.checkIfAnswered();

    this.cargarEncuesta();
  }

  checkIfAnswered() {
    this.activatedRoute.params.subscribe(params => {
      let id = params ['id']

      if (id) {
        this.encuestaService.getEncuesta(id).subscribe((encuesta) => {
          // initialize respuestasMap
          if (encuesta.tipo == 'Abierto') {
            //TODO si es abierto validacion por ip

          } else if (encuesta.tipo == 'Cerrado') {
            console.log("enmtra cerrado")
            if (this.authService.isAuthenticated()) {
              this.respuestaService.getUsersWhoAnsweredEncuesta(id).subscribe(response => {
                console.log("Para validar si esta: ", response);
                response.forEach(e => {
                  if (e == JSON.parse(sessionStorage.getItem("persona")).id) {
                    this.router.navigate(['/encuestas/public'])
                    Swal.fire('Aviso', `Usted ya respondio a esta encuesta.`, 'warning')
                  }
                })
              })
            } else {
              this.router.navigate(['/login'])
              Swal.fire('Aviso', `Usted necesita estar authenticado para responder encuestas cerradas.`, 'warning')
            }

          }
        })
      }
    })
  }

  cargarEncuesta(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params ['id']
      console.log(id);
      if (!JSON.parse(sessionStorage.getItem("persona"))) {
        console.log("es anonimo");
        this.usuarioId = 0;
      } else {
        this.usuarioId = JSON.parse(sessionStorage.getItem("persona")).id;
      }
      if (id) {
        this.encuestaService.getEncuesta(id).subscribe((encuesta) => {
          // initialize respuestasMap
          encuesta.preguntas.forEach(p => {
            this.respuestasMap[p.id] = {};
            if (p.tipo == TipoPreguntaEnum.RESPUESTA_SIMPLE || p.tipo == TipoPreguntaEnum.PARRAGO)
              this.respuestasMap[p.id][0] = {};
            else
              p.opciones.forEach(o => {
                this.respuestasMap[p.id][o.id] = {};
              })
          });
          this.encuesta = encuesta;
          console.log(encuesta)
          console.log(this.respuestasMap)
        })
      }
    })
  }

  onSubmit() {
    // para que veas la estructura del map
    console.log('respuestasMap', this.respuestasMap);
    return;
    const respuestas = this.convertRespuestaMapToArrayRespuesta(this.respuestasMap);
    // para que veas como quedo el map despues de la conversion
    console.log('respuestas', respuestas);

    this.respuestaService.saveAllRespuetas(respuestas).subscribe(resp => {
      // do something here
      this.router.navigate(['/encuestas/public'])
      Swal.fire('¡Gracias por su Respuesta!', `Se recibio su respuesta satisfactoriamente.`, 'success')
    })
  }

  get areAllCheckboxesRequiredValid() {
    if (!this.encuesta || !this.encuesta.preguntas) {
      return false;
    }

    const requiredCheckboxesIds = this.encuesta.preguntas
      .filter(p => p.tipo === TipoPreguntaEnum.CASILLAS_DE_VERIFICACION && p.required)
      .map(p => p.id);

    if (!requiredCheckboxesIds.length) {
      return true;
    }

    return requiredCheckboxesIds
      .map(id => this.respuestasMap[id])
      .map(resp => Object.values(resp))
      .map(resp => resp.map(r => r.opcionId).reduce((isValid, c) => isValid || !!c , false))
      .reduce((isValid, c) => isValid || !!c , false);
  }

  private convertRespuestaMapToArrayRespuesta(respuestasMap): Array<IRespuesta> {
    const respuestas: Array<IRespuesta> = [];
    console.log("respuestasMap: ", respuestasMap)

    Object.keys(respuestasMap).forEach(preguntaId => {
      const pregunta = respuestasMap[preguntaId];
      // Object.values(pregunta).forEach(pregunta=>{
      //   console.log(pregunta.numValue)
      // })

      Object.keys(pregunta).forEach(opcionId => {
        // clono la opcion para no tocar los valores de respuestasMap
        const respuesta: IRespuesta = Object.assign({}, respuestasMap[preguntaId][opcionId]);
        console.log("respuesta para enviar:", respuesta)
        // si la respuesta no esta vacia, la incluyo en el array de respuestas
        // para las casillas debido al checbox opcionId es un booleano, true si ha sido seleccionado, false | undefined si no fue selecionado
        // con el IF nos aseguramos solo seleccionar aquellas casillas seleccionadas = true
        if (respuesta.numValue) {
          console.log("hay numvalue: ", respuesta.numValue)
          respuesta.preguntaId = Number(preguntaId);
          respuesta.usuarioId = this.usuarioId;
          respuestas.push(respuesta);
        }
        if (respuesta.textValue || respuesta.opcionId) {
          // sostituimos opcionId porque podria ser boolean debido a las casillas.
          if (Number(opcionId) != 0)
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
