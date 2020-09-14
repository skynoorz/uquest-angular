import {Component, OnInit} from '@angular/core';
import {Encuesta} from "../../personas/encuesta";
import {ActivatedRoute, Router} from "@angular/router";
import {EncuestasService} from "../../services/encuestas.service";
import {UprService} from "../../services/upr.service";
import {UprSend} from "../../classes/uprSend";
import {Opcion, OpcionSend} from "../../personas/opcion";
import {forkJoin, Observable} from "rxjs";
import {TipoPreguntaEnum} from "../../personas/pregunta";

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
  // public uprOptionsVerificacionSend: number[] = [];
  public uprPreguntas: number[] = [];
  public uprArray: UprSend[] = [];

  public AnswersE: number[] =[]
  public AnswersIdE: number[] =[]
  public uprOptionsEscalaSend: OpcionSend[] = []

  public AnswersS: string[] = [];
  public AnswersP: string[] = [];
  public AnswersIdS: number[] = [];
  public AnswersIdP: number[] = [];
  public arraySendS: OpcionSend[] = []
  public arraySendP: OpcionSend[] = []


  // public uprNew: UprSend = {"usuario": {"id": 1}, "pregunta": {"id": 1}, "opcion": {"id": 1}};


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

    //Array de Ids de preguntas
    this.uprArray = [];
    this.uprPreguntas = [];
    this.encuesta.preguntas.forEach((p) => {
      this.uprPreguntas.push(p.id);
    })

    this.fillUPR();

    console.log("MI ARRAY UPR")
    console.log(this.uprArray)

    // Guardar en UPR

    this.uprArray.forEach(upr => {
      this.uprService.sendRespuestas(upr).subscribe(upr => {
        // console.log(upr);
      })
    })

    this.router.navigate(['/encuestas'])
  }

  mostrar(test: any): void {
    console.log(test);
  }

  guardarOpcionesS(preguntaId: number) {
    this.AnswersS.forEach(op => {
      this.arraySendS.push({"texto": op, "tipo": 2});
    })
    this.encuestaService.saveOptions(this.arraySendS).subscribe(opcion => {
      this.getIdsFromTextS(preguntaId);
    })

  }

  guardarOpcionesP(preguntaId: number) {
    this.AnswersP.forEach(op => {
      this.arraySendP.push({"texto": op, "tipo": 4});
    })
    this.encuestaService.saveOptions(this.arraySendP).subscribe(opcion => {
      this.getIdsFromTextP(preguntaId);
    })
  }

  guardarOpcionesE(preguntaId: number){
    this.AnswersE.forEach(op=>{
      // if (option != undefined)
      this.uprOptionsEscalaSend.push({"texto": op.toString(), "tipo": 6})
    })
    this.encuestaService.saveOptions(this.uprOptionsEscalaSend).subscribe(opcion => {
      this.getIdsFromTextE(preguntaId);
    })
  }

  getIdsFromTextS(index: number) {
    //ojo con este i
    this.AnswersS.forEach((an, i) => {
      // console.log("envio al backend: " + an)
      this.encuestaService.getIdsFromText(an).subscribe(response => {
        // console.log("Response: ")
        // console.log(response);
        this.AnswersIdS.push(response.pop());
        this.uprArray.push({
          "usuario": {"id": this.usuarioId},
          "pregunta": {"id": this.uprPreguntas[index]},
          "opcion": {"id": this.AnswersIdS.pop()}
        });
      })
    })
  }

  getIdsFromTextP(index: number) {
    this.AnswersP.forEach((an, i) => {
      // console.log("envio al backend: " + an)
      this.encuestaService.getIdsFromText(an).subscribe(response => {
        // console.log("Response: ")
        // console.log(response);
        this.AnswersIdP.push(response.pop());
        this.uprArray.push({
          "usuario": {"id": this.usuarioId},
          "pregunta": {"id": this.uprPreguntas[index]},
          "opcion": {"id": this.AnswersIdP.pop()}
        });
      })
    })
  }

  getIdsFromTextE(index: number){
    this.AnswersE.forEach((an, i) => {
      // console.log("envio al backend: " + an)
      this.encuestaService.getIdsFromText(an.toString()).subscribe(response => {
        // console.log("Response: ")
        // console.log(response);
        this.AnswersIdE.push(response.pop());
        this.uprArray.push({
          "usuario": {"id": this.usuarioId},
          "pregunta": {"id": this.uprPreguntas[index]},
          "opcion": {"id": this.AnswersIdE.pop()}
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
