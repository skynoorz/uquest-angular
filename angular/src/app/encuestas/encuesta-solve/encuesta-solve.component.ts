import { Component, OnInit } from '@angular/core';
import {Encuesta} from "../../personas/encuesta";
import {ActivatedRoute} from "@angular/router";
import {EncuestasService} from "../../services/encuestas.service";
import {Upr} from "../../classes/upr";
import {UprService} from "../../services/upr.service";

@Component({
  selector: 'app-encuesta-solve',
  templateUrl: './encuesta-solve.component.html',
  styleUrls: ['./encuesta-solve.component.css']
})
export class EncuestaSolveComponent implements OnInit {

  public encuesta: Encuesta = new Encuesta();
  public upr: Upr[];

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
        this.encuestaService.getEncuesta(id).subscribe((encuesta)=>{
          this.encuesta = encuesta;
          console.log(encuesta)
        })
        // this.personaService.getPersona(id).subscribe((user) => {
        //   user.password = '';
        //   this.user = user;
        //   this.user.carreraId = user.carrera.id;
        //   if (user.instituto)
        //     this.user.institutoId = user.instituto.id;
        //   console.log(this.user);
        // })

        // console.log(id)
        // console.log("Persona que encuentra: " + this.personaService.getPersona(id));
        // console.log("Persona registrada: " + this.user)
      }
    })
  }

  onSubmit(upr: Upr[]) {
    console.log("enviamos al backend")
    this.uprService.sendRespuestas(upr).subscribe(upr=>{
      console.log(upr);
    })
  }
}
