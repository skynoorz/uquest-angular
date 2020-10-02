import {Component, OnInit} from '@angular/core';
import {EncuestasService} from "../services/encuestas.service";
import {Encuesta} from "../classes/encuesta";
import {AuthService} from "../usuarios/auth.service";
import {RespuestasService} from "../services/respuestas.services";
import {TipoPreguntaEnum} from "../classes/pregunta";

@Component({
  selector: 'app-encuestas',
  templateUrl: './encuestas.component.html',
  styleUrls: ['./encuestas.component.css']
})
export class EncuestasComponent implements OnInit {

  public encuestas: Encuesta[];

  constructor(private encuestasService: EncuestasService,
              public authService: AuthService,
              private respuestaService: RespuestasService) {

    if (this.authService.isAuthenticated()) {
      this.encuestasService.getEncuestasByUsername(JSON.parse(sessionStorage.getItem("persona")).username).subscribe(encuestas=>{
        this.encuestas = encuestas;
        encuestas.map(encuesta=> {
          this.respuestaService.getRespuestasByEncuestaId(encuesta.id).subscribe(response=>{
            console.log('Encuesta id: ',encuesta.id)
            console.log(`Respuestas: `,response);
          })
        })
        console.log(this.encuestas);
      })
    } else {
      // TODO
      console.log("Redireccionar a encuestas publicas")
    }

  }

  ngOnInit(): void {

  }
}
