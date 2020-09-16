import {Component, OnInit} from '@angular/core';
import {Encuesta} from "../../personas/encuesta";
import {ActivatedRoute, Router} from "@angular/router";
import {EncuestasService} from "../../services/encuestas.service";
import {UprService} from "../../services/upr.service";
import {UprSend} from "../../classes/uprSend";
import {Opcion, OpcionSend} from "../../personas/opcion";
import {forkJoin, Observable} from "rxjs";
import {TipoPreguntaEnum} from "../../personas/pregunta";
import Swal from "sweetalert2";

@Component({
  selector: 'app-encuesta-solve',
  templateUrl: './encuesta-solve.component.html',
  styleUrls: ['./encuesta-solve.component.css']
})
export class EncuestaSolveComponent implements OnInit {

  public encuesta: Encuesta = new Encuesta();
  public usuarioId: number = JSON.parse(sessionStorage.getItem("persona")).id;

  public uprOptionsMultiple: number[] = [];
  public uprOptionsVerificacion: boolean[] = [];
  public uprPreguntas: number[] = [];
  public uprArray: UprSend[] = [];

  // Arrays de Respuesta Simple, Parrafo, Escala Lineal
  public AnswersS: string[] = [];
  public AnswersP: string[] = [];
  public AnswersE: number[] = []
  public arraySendS: OpcionSend[] = []
  public arraySendP: OpcionSend[] = []
  public arraySendE: OpcionSend[] = []

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private encuestaService: EncuestasService,
              private uprService: UprService) {
  }

  ngOnInit(): void {
    this.cargarEncuesta();
  }

  cargarEncuesta(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params ['id']
      if (id) {
        this.encuestaService.getEncuesta(id).subscribe((encuesta) => {
          this.encuesta = encuesta;
          console.log(encuesta)
        })
      }
    })
  }

  onSubmitArray() {
    this.uprArray = [];
    this.uprPreguntas = [];
    this.encuesta.preguntas.forEach((p) => {
      this.uprPreguntas.push(p.id);
    })

    this.fillUPR();
    console.log("MI ARRAY UPR", this.uprArray)

    // Guardar en UPR

    // this.uprArray.forEach(upr => {
    //   this.uprService.sendRespuesta(upr).subscribe(response => {
    //     console.log(response);
    //   })
    // })

    // Enviar todos los UPR[] al BE
    // TODO cuando commento esta linea mi uprArray esta correcto, pero al enviar al BE no lo envia completo :S
    this.uprService.sendRespuestas(this.uprArray).subscribe(response => {console.log(response)});

  }

  guardarOpcionesS(preguntaId: number) {
    this.AnswersS.forEach(op => {
      this.arraySendS.push({"texto": op, "tipo": 2});
    })
    this.encuestaService.saveOptions(this.arraySendS).subscribe(response => {
      response['opcion'].forEach(opcion => {
        this.uprArray.push({
          "usuario": {"id": this.usuarioId},
          "pregunta": {"id": this.uprPreguntas[preguntaId]},
          "opcion": {"id": opcion.id}
        });
      })
    })

  }

  guardarOpcionesP(preguntaId: number) {
    this.AnswersP.forEach(op => {
      this.arraySendP.push({"texto": op, "tipo": 4});
    })
    this.encuestaService.saveOptions(this.arraySendP).subscribe(response => {
      response['opcion'].forEach(opcion => {
        this.uprArray.push({
          "usuario": {"id": this.usuarioId},
          "pregunta": {"id": this.uprPreguntas[preguntaId]},
          "opcion": {"id": opcion.id}
        });
      })
    })
  }

  guardarOpcionesE(preguntaId: number) {
    this.AnswersE.forEach(op => {
      this.arraySendE.push({"texto": op.toString(), "tipo": 6})
    })
    this.encuestaService.saveOptions(this.arraySendE).subscribe(response => {
      response['opcion'].forEach(opcion => {
        this.uprArray.push({
          "usuario": {"id": this.usuarioId},
          "pregunta": {"id": this.uprPreguntas[preguntaId]},
          "opcion": {"id": opcion.id}
        });
      })
    })
  }

  fillUPR() {
    this.encuesta.preguntas.forEach((p, index) => {
      switch (p.tipo) {
        case TipoPreguntaEnum.RESPUESTA_SIMPLE:
          this.guardarOpcionesS(index);
          break
        case TipoPreguntaEnum.PARRAGO:
          this.guardarOpcionesP(index);
          break;
        case TipoPreguntaEnum.CASILLAS_DE_VERIFICACION:
          p.opciones.forEach((opcion, pos) => {
            if (this.uprOptionsVerificacion[pos]) {
              this.uprArray.push({
                "usuario": {"id": this.usuarioId},
                "pregunta": {"id": this.uprPreguntas[index]},
                "opcion": {"id": opcion.id}
              });
            }
          })
          break;
        case TipoPreguntaEnum.OPCION_MULTIPLE:
          // console.log("OPCION MULTIPLE")
          this.uprOptionsMultiple.forEach((num, i) => {
            // console.log("antes de guardar: ", this.uprNew)
            // console.log(this.uprOptionsMultiple[i]);
            this.uprArray.push({
              "usuario": {"id": this.usuarioId},
              "pregunta": {"id": this.uprPreguntas[index]},
              "opcion": {"id": this.uprOptionsMultiple[i]}
            });
          })
          // console.log("UPR ARRAY")
          // console.log(this.uprArray);
          break;
        case TipoPreguntaEnum.ESCALA_LINEAL:
          this.guardarOpcionesE(index)
          break;
      }
    })
    console.log("uprOptionsverificacion")
    console.log(this.uprOptionsVerificacion)
  }


}
