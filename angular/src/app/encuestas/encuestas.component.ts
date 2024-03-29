import {Component, OnInit} from '@angular/core';
import {EncuestasService} from "../services/encuestas.service";
import {Encuesta} from "../classes/encuesta";
import {AuthService} from "../usuarios/auth.service";
import Swal from "sweetalert2";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {CopyModalComponent} from "./encuesta-listar/copy-modal.component";
import {DialogModificarFechaComponent} from "./dialog-modificar-fecha/dialog-modificar-fecha.component";

@Component({
  selector: 'app-encuestas',
  templateUrl: './encuestas.component.html',
  styleUrls: ['./encuestas.component.css']
})
export class EncuestasComponent implements OnInit {

  public encuestas: Encuesta[] = [];
  public encuestasAvailable: number[] = [];

  constructor(private encuestasService: EncuestasService,
              public authService: AuthService,
              private router: Router,
              public dialog: MatDialog) {


    if (this.authService.isAuthenticated()) {
      this.encuestasService.getEncuestasByUsername(JSON.parse(localStorage.getItem("persona")).username).subscribe(encuestas => {
        this.encuestas = encuestas;
      })
    } else {
      this.router.navigate(['/'])
      Swal.fire('Error', `Debe estar authenticado para acceder a este recurso`, 'error')
    }

  }

  ngOnInit(): void {
    this.cargarEncuestasAvailable();
  }

  popupModal(encuestaId: string) {
    this.dialog.open(CopyModalComponent, {
      data: {
        address: '/#/encuestas/solve/' + encuestaId
      }
    });
  }

  private cargarEncuestasAvailable() {
    this.encuestasService.getEncuestasAvailable().subscribe(encuestasIds => {
      this.encuestasAvailable = encuestasIds;
    })
  }

  eliminarEncuesta(encuestaId: number) {
    Swal.fire({
      title: 'Estas seguro?',
      text: "Despues no podras revertir esta accion!",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminalo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.encuestasService.delete(encuestaId).subscribe(msg => {
          Swal.fire(
            'Eliminado!',
            'Tu encuesta a sido eliminada.',
            'success'
          )
          this.router.navigate(['/encuestas'])
          // console.log(msg);
        })
      }
    })
  }

  finalizarEncuesta(id: number) {
    Swal.fire({
      title: 'Estas por finalizar esta encuesta',
      text: "Puedes habilitarla luego usando el boton renovar!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, finalizalo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.encuestasService.finalizarEncuesta(id).subscribe(() => {
          // console.log(response);
          Swal.fire(
            'Finalizado!',
            'Tu encuesta a sido finalizada.',
            'success'
          )
        })

      }
    })
  }

  modificarFechasOpenDialog(id: number): void {
    this.dialog.open(DialogModificarFechaComponent, {
      width: '350px',
      data: {id: id}
    })
  }

  copiarEncuesta(id: number) {
    this.encuestasService.getEncuesta(id).subscribe(encuesta=>{
      sessionStorage.setItem("clipboard",JSON.stringify(encuesta));
    })
  }
}
