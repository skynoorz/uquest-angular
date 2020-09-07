import {Component, OnInit} from '@angular/core';
import {Encuesta} from "../../personas/encuesta";
import {ActivatedRoute} from "@angular/router";
import {EncuestasService} from "../../services/encuestas.service";
import {UprService} from "../../services/upr.service";
import {UprSend} from "../../classes/uprSend";

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
  public usuarioId: number = JSON.parse(sessionStorage.getItem("persona")).id;
  public uprNew: UprSend = {"usuario": {"id": 1}, "pregunta": {"id": 1}, "opcion": {"id": 1}};
  // public uprNew: UprSend;

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

  onSubmitArray(){
    this.uprArray = [];
    this.encuesta.preguntas.forEach((p)=>{
      this.uprPreguntas.push(p.id);
    })
    console.log(this.usuarioId)
    this.encuesta.preguntas.forEach((p,index)=>{
      console.log("antes de guardar: ",this.uprNew)
      this.uprArray.push({"usuario": {"id": this.usuarioId}, "pregunta": {"id": this.uprPreguntas[index]}, "opcion": {"id": this.uprOptions[index]}});
    })

    this.uprArray.forEach(upr=>{
      this.uprService.sendRespuestas(upr).subscribe(upr => {
        console.log(upr);
      })
    })
  }

  mostrar(test: any): void {
    console.log(test);
  }


}
