import {Component, OnInit} from '@angular/core';
import {Encuesta} from "../../personas/encuesta";
import {ActivatedRoute} from "@angular/router";
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
  public uprOptions: number[] = [];
  public uprPreguntas: number[] = [];
  public uprArray: UprSend[] = [];
  public Answers: string[] = [];
  public AnswersId: number[] = [];
  public usuarioId: number = JSON.parse(sessionStorage.getItem("persona")).id;
  public uprNew: UprSend = {"usuario": {"id": 1}, "pregunta": {"id": 1}, "opcion": {"id": 1}};
  public arraySend: OpcionSend[] = []

  constructor(private activatedRoute: ActivatedRoute,
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

  onSubmit(upr: UprSend) {
    this.uprService.sendRespuestas(this.uprNew).subscribe(upr => {
      console.log(upr);
    })
  }

  onSubmitArray() {

    //Array de Ids de preguntas
    this.uprArray = [];
    this.encuesta.preguntas.forEach((p) => {
      this.uprPreguntas.push(p.id);
    })

    console.log(this.Answers);

    // guardo las nuevas opciones para Respuesta Simple y Parrafo
    this.guardarOpciones();

    /*const arrayDeObservables: Observable<any>[] = this.Answers.map(op => {
      this.opcionSend.texto = op;
      return this.encuestaService.saveOption(this.opcionSend)
    });
    console.log("ArrayDeObservables")
    console.log(arrayDeObservables);
    // llama todos los observables y espera a que todos terminen, luego recien llama el callback
    forkJoin(arrayDeObservables).subscribe(arrayDeRespuestas => {
      this.getIdsFromText();
    });*/

    console.log("Nuevo Array:")
    console.log(this.AnswersId)

    //Antigua forma

    // this.encuesta.preguntas.forEach((p, index) => {
    //   // console.log("antes de guardar: ", this.uprNew)
    //   this.uprArray.push({"usuario": {"id": this.usuarioId}, "pregunta": {"id": this.uprPreguntas[index]}, "opcion": {"id": this.uprOptions[index]}});
    // })



    console.log("Preguntas")
    console.log(this.uprPreguntas)

    console.log("MI ARRAY UPR")
    console.log(this.uprArray)
    // Guardar en UPR

    /*this.uprArray.forEach(upr => {
      this.uprService.sendRespuestas(upr).subscribe(upr => {
        // console.log(upr);
      })
    })*/
  }

  mostrar(test: any): void {
    console.log(test);
  }

  guardarOpciones(){
    this.Answers.forEach(op => {
      this.arraySend.push({"texto":op});
    })
    this.encuestaService.saveOptions(this.arraySend).subscribe(opcion => {
      this.getIdsFromText();
    })

  }

  getIdsFromText(){
    this.Answers.forEach((an, i)=>{
      console.log("envio al backend: "+an)
      this.encuestaService.getIdsFromText(an).subscribe(response=>{
        console.log("Response: ")
        console.log(response);
        this.AnswersId.push(response.pop());
        this.fillUPR();
      })
    })
  }

  fillUPR(){
    this.encuesta.preguntas.forEach((p,index)=>{
      switch (p.tipo) {
        case TipoPreguntaEnum.RESPUESTA_SIMPLE:
          console.log("ANSWERS ID")
          console.log(JSON.stringify(this.AnswersId));

          this.uprArray.push({"usuario":  {"id": this.usuarioId},
                              "pregunta": {"id": this.uprPreguntas[index]},
                              "opcion":   {"id": this.AnswersId.pop()}});
          break
        case TipoPreguntaEnum.PARRAGO:
          break;
        case TipoPreguntaEnum.CASILLAS_DE_VERIFICACION:
          break;
        case TipoPreguntaEnum.OPCION_MULTIPLE:
          break;
        case TipoPreguntaEnum.ESCALA_LINEAL:
          break;
      }
    })
  }


}
