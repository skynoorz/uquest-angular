import {Component, OnInit} from '@angular/core';
import {EncuestasService} from "../services/encuestas.service";
import {Encuesta} from "../personas/encuesta";
import {UprService} from "../services/upr.service";
import {AuthService} from "../usuarios/auth.service";
import {toArray} from "rxjs/operators";

@Component({
  selector: 'app-encuestas',
  templateUrl: './encuestas.component.html',
  styleUrls: ['./encuestas.component.css']
})
export class EncuestasComponent implements OnInit {

  public encuestas: Encuesta[];
  upr: any = [];

  constructor(private encuestasService: EncuestasService,
              private uprService: UprService,
              public authService: AuthService) {

    if (this.authService.isAuthenticated()) {
      this.encuestasService.getEncuestasByUsername(JSON.parse(sessionStorage.getItem("persona")).username).subscribe(encuestas => {
          // this.encuestas = encuestas;
          encuestas.forEach(encuesta => {
            this.uprService.getTotalUPR(encuesta.id).subscribe(uprs => {
              // guarda en la encuesta
              encuesta.upr = uprs;
              // guardar en UPR global
              uprs.forEach((upr, index) => {
                this.upr[index] = {preguntaId: upr.preguntaId, opcionId: upr.opcionId, total: upr.total};
              })
              // console.log(encuestas);
              this.encuestas = encuestas;
              // por cada pregunta ingresar a opcion y guardar el total
              this.encuestas.forEach(encuesta => {
                encuesta.preguntas.forEach(pregunta => {
                  var total: number = 0;
                  encuesta.upr.forEach(uprTotal => {
                    if (pregunta.id == uprTotal.preguntaId)
                      total = total + uprTotal.total;
                  })
                  console.log("TOTAL por pregunta: " + total)
                  pregunta.opciones.forEach(opcion => {
                    // opcion.total = 10
                    encuesta.upr.forEach(uprGuardar => {
                      //pregunto si equivale cada uno
                      if (pregunta.id == uprGuardar.preguntaId && opcion.id == uprGuardar.opcionId)
                        opcion.total = (uprGuardar.total * 100) / total;
                    })
                  })
                })
              })
              this.encuestas = encuestas;
              console.log(encuestas);
            });
          })
        }
      )
      console.log(this.upr);
    } else {
      // TODO
      console.log("Mostrar Encuestas Publicas")
    }

  }

  ngOnInit(): void {


  }

  mostrarEncuesta() {
    console.log(this.encuestas);
  }

}
