import {Component, OnInit} from '@angular/core';
import {EncuestasService} from "../services/encuestas.service";
import {Encuesta} from "../classes/encuesta";
import {AuthService} from "../usuarios/auth.service";
import {RespuestasService} from "../services/respuestas.services";
import {TipoPreguntaEnum} from "../classes/pregunta";
import Swal from "sweetalert2";
import {Router} from "@angular/router";

@Component({
  selector: 'app-encuestas',
  templateUrl: './encuestas.component.html',
  styleUrls: ['./encuestas.component.css']
})
export class EncuestasComponent implements OnInit {

  public encuestas: Encuesta[];

  constructor(private encuestasService: EncuestasService,
              public authService: AuthService,
              private router: Router,
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
      this.router.navigate(['/encuestas'])
      Swal.fire('Error', `Debe estar authenticado para realizar esta operacion`, 'error')
    }

  }

  ngOnInit(): void {

  }
}
