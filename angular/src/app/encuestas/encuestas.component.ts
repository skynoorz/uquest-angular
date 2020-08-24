import {Component, OnInit} from '@angular/core';
import {EncuestasService} from "../services/encuestas.service";
import {Encuesta} from "../personas/encuesta";
import {UprService} from "../services/upr.service";
import {AuthService} from "../usuarios/auth.service";

@Component({
  selector: 'app-encuestas',
  templateUrl: './encuestas.component.html',
  styleUrls: ['./encuestas.component.css']
})
export class EncuestasComponent implements OnInit {

  public encuestas: Encuesta[];

  constructor(private encuestasService: EncuestasService,
              private uprService: UprService,
              public authService: AuthService) {
  }

  ngOnInit(): void {
    // this.encuestasService.getEncuestas(1).subscribe(encuesta=>{
    //     this.encuestas = encuesta;
    //     console.log(this.encuestas);
    //   }
    // )
    // console.log("username: "+JSON.parse(sessionStorage.getItem("persona")).username)
    if (this.authService.isAuthenticated()){
      this.encuestasService.getEncuestasByUsername(JSON.parse(sessionStorage.getItem("persona")).username).subscribe(encuestas => {
          // this.encuestas = encuestas;
          encuestas.forEach(encuesta => {
            this.uprService.getUPR(encuesta.id).subscribe(upr => {
              encuesta.upr = upr;
              console.log(encuestas);
              this.encuestas=encuestas;
            });
          })
          console.log(this.encuestas);
        }
      )
    }
    else {
      // TODO
      console.log("Mostrar Encuestas Publicas")
    }
    // this.uprService.getAllUpr().subscribe(upr => {
    //   upr.forEach(e => {
    //     // console.log("UPR: "+JSON.stringify(e))
    //   })
    // })
  }

}
