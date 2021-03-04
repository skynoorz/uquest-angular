import {Component, OnInit} from '@angular/core';
import {CarreraService} from "../../services/carrera.service";
import {Carrera} from "../../classes/carrera";
import {MatDialog} from "@angular/material/dialog";
import {CarreraFormComponent} from "../carrera-form/carrera-form.component";
import {InstitutoFormComponent} from "../instituto-form/instituto-form.component";
import Swal from "sweetalert2";
import {InstitutoService} from "../../services/instituto.service";

@Component({
  selector: 'app-carreras-instituto',
  templateUrl: './carreras-instituto.component.html',
  styleUrls: ['./carreras-instituto.component.css']
})
export class CarrerasInstitutoComponent implements OnInit {

  carreras: Carrera[];
  panelOpenState: boolean = false;

  constructor(private carreraService: CarreraService,
              private institutoService: InstitutoService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.cargarCarreras();
  }

  cargarCarreras() {
    this.carreraService.getCarreras().subscribe(carreras => this.carreras = carreras)
  }

  agregarCarreraOpenDialog() {
    const dialogRef = this.dialog.open(CarreraFormComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result=>{
      result = {...result, ... {institutos: []}}
      this.carreras.push(result)
      // console.log(result);
    })
  }

  editarCarreraOpenDialog(id: number) {
    this.dialog.open(CarreraFormComponent, {
      width: '500px',
      data: {"id": id}
    })
  }

  agregarInstitutoOpenDialog(idCarrera: number) {
    this.dialog.open(InstitutoFormComponent, {
      width: '500px',
      data: {"idCarrera": idCarrera}
    })
  }

  editarInstitutoOpenDialog(idInstituto: number, idCarrera: number) {
    this.dialog.open(InstitutoFormComponent, {
      width: '500px',
      data: {"idInstituto": idInstituto, "idCarrera": idCarrera}
    })
  }

  eliminarInstituto(id: number) {
    // Swal.fire({
    //   title: 'Estas seguro?',
    //   text: "No podras revertir esta accion!",
    //   icon: 'warning',
    //   showCancelButton: true,
    //   confirmButtonColor: '#3085d6',
    //   cancelButtonColor: '#d33',
    //   cancelButtonText: 'Cancelar',
    //   confirmButtonText: 'Si, eliminalo!'
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     this.institutoService.delete(id).subscribe(r=>{
    //       Swal.fire(
    //         'Eliminado!',
    //         'El instituto a sido eliminado.',
    //         'success'
    //       )
    //     })
    //   }
    // })
    this.institutoService.delete(id).subscribe(() => {
      Swal.fire({
        title: 'Estas seguro?',
        text: "No podras revertir esta accion!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Si, eliminalo!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Eliminado!',
            'El instituto a sido eliminado.',
            'success'
          )
        }
      })
    }, error => {
      if (error.status == 500) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'No se pudo eliminar el instituto debido a que existen usuarios registrados en ella!',
          showConfirmButton: true,
          timer: 5000
        })
      }
    })
  }

  eliminarCarrera(id: number) {
    this.carreraService.delete(id).subscribe(() => {
      Swal.fire({
        title: 'Estas seguro?',
        text: "Si eliminas esta carrera los institutos dentro de esta carrera tambien seran eliminados!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Si, eliminalo!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Eliminado!',
            'La carrera a sido eliminada junto a los institutos asociados.',
            'success'
          )
        }
      })
    }, error => {
      if (error.status == 500) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'No se pudo eliminar la carrera debido a que existen usuarios registrados con ella!',
          showConfirmButton: true,
          timer: 5000
        })
      }
    })
  }


}
