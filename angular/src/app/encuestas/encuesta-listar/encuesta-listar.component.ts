import {Component, OnInit} from '@angular/core';
import {EncuestasService} from "../../services/encuestas.service";
import {Encuesta} from "../../classes/encuesta";
import {MatDialog} from "@angular/material/dialog";
import {CopyModalComponent} from "./copy-modal.component";
import {environment} from "../../../environments/environment";
import {MatSelectChange} from "@angular/material/select";
import {CarreraService} from "../../services/carrera.service";
import {Carrera} from "../../classes/carrera";

@Component({
  selector: 'app-encuesta-listar',
  templateUrl: './encuesta-listar.component.html',
  styleUrls: ['./encuesta-listar.component.css']
})

export class EncuestaListarComponent implements OnInit {
  encuestas: Encuesta[];
  encuestasAvailableIds: number[] = [];

  basePathFoto: string = environment.basePath;

  public color: string = 'lightblue';
  address: string;
  isLoadingResults: boolean = true;
  carreras: Carrera[];
  carrera: number = 1;

  constructor(private encuestaService: EncuestasService,
              private carreraService: CarreraService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    // this.cargarEncuestasPublicas();
    this.cargarEncuestasAvailables();
    this.cargarCarreras();
    this.changeContent(1);
  }

  cargarCarreras() {
    this.carreraService.getCarreras().subscribe(carreras => {
      this.carreras = carreras;
    })
  }

  share(encuestaId: number) {
    this.dialog.open(CopyModalComponent, {
      data: {
        address: '/#/encuestas/solve/' + encuestaId
      }
    });
  }

  private cargarEncuestasAvailables() {
    this.encuestaService.getEncuestasAvailable().subscribe(encuestasIds => {
      this.encuestasAvailableIds = encuestasIds;
    })
  }

  changeContent(event: number) {
    this.isLoadingResults = true;
    this.encuestaService.getEncuestasByCarreraId(event).subscribe(encuestas => {
      // @ts-ignore
      this.encuestas = encuestas.encuestas;
      this.encuestas.forEach(e => {
        let date = new Date(e.createAt)
        let day = date.getDate()
        let month = date.getMonth() + 1
        let year = date.getFullYear()

        if (month < 10) {
          if (day < 10){
            e.createAt = 0 +day.toString() + '-' + 0 + month.toString() + -+year.toString();
          }
          else{
            e.createAt = day.toString() + '-' + 0 + month.toString() + -+year.toString();
          }
        }
        else{
          if (day < 10){
            e.createAt = 0 +day.toString() + '-' + month.toString() + -+year.toString();
          }
          else{
            e.createAt = day.toString() + '-' + month.toString() + -+year.toString();
          }
        }
      })
      this.isLoadingResults = false;
      // console.log(encuestas)
    })
  }
}
