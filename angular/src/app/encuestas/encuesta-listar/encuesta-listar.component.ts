import { Component, OnInit } from '@angular/core';
import {EncuestasService} from "../../services/encuestas.service";
import {Encuesta} from "../../classes/encuesta";
import {MatDialog} from "@angular/material/dialog";
import {CopyModalComponent} from "./copy-modal.component";

@Component({
  selector: 'app-encuesta-listar',
  templateUrl: './encuesta-listar.component.html',
  styleUrls: ['./encuesta-listar.component.css']
})
export class EncuestaListarComponent implements OnInit {
  encuestas: Encuesta[];

  public color: string = 'lightblue';
  address: string;
  constructor(private encuestaService: EncuestasService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.cargarEncuestasPublicas();
  }

  cargarEncuestasPublicas(){
    this.encuestaService.getAllPublicEncuestas().subscribe(response=>{
      this.encuestas=response;
      console.log(this.encuestas)
    });
  }

  share(encuestaId: number) {
    this.dialog.open(CopyModalComponent, {
      data: {
        address: '/encuestas/solve/'+encuestaId
      }
    });
  }
}
