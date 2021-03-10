import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup} from "@angular/forms";
import {FormlyFieldConfig} from "@ngx-formly/core";
import {EncuestasService} from "../../services/encuestas.service";
import {Encuesta} from "../../classes/encuesta";
import Swal from "sweetalert2";

@Component({
  selector: 'app-dialog-modificar-fecha',
  templateUrl: './dialog-modificar-fecha.component.html'
})

export class DialogModificarFechaComponent implements OnInit {
  encuesta: Encuesta;

  form = new FormGroup({});
  fields: FormlyFieldConfig[] = [
    {
      key: 'fechaIni',
      type: 'datepicker',
      templateOptions: {
        label: 'Fecha de inicio',
        datepickerOptions: {
          min: new Date(),
          max: new Date(new Date().setFullYear(new Date().getFullYear() + 1))
        },
        required: true
      },
      validators: {
        esMayor: {
          expression: (control: FormControl) => {
            return this.esMenor(new Date(control.value))
          },
          message: 'La fecha incial debe ser menor a la final',
        }
      }
    },
    {
      key: 'fechaFin',
      type: 'datepicker',
      templateOptions: {
        label: 'Fecha final',
        datepickerOptions: {
          min: new Date(),
          max: new Date(new Date().setFullYear(new Date().getFullYear() + 1))
        },
        required: true
      },
      validators: {
        esMayor: {
          expression: (control: FormControl) => {
            return this.esMayor(new Date(control.value))
          },
          message: 'La fecha final debe ser mayor a la inicial',
        }
      }
    }
  ]


  private esMayor(value: Date): boolean {
    if (this.encuesta?.fechaIni){
      if (new Date(new Date(this.encuesta.fechaIni)) >= value) {
        return false;
      }
    }
    return true;

  }
  private esMenor(value: Date): boolean {
    if (this.encuesta?.fechaFin){
      if (new Date(new Date(this.encuesta.fechaFin)) <= value) {
        return false;
      }
    }
    return true;

  }

  ngOnInit(): void {

  }

  constructor(public dialogRef: MatDialogRef<DialogModificarFechaComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { id: number },
              private encuestaService: EncuestasService) {
    this.encuestaService.getEncuesta(data.id).subscribe(encuesta => {
      this.encuesta = encuesta;
    })
  }

  modificarFechaBD() {

    this.encuestaService.save(this.encuesta).subscribe(response => {
      this.dialogRef.close();
      Swal.fire(
        'Actualizado!',
        'Se actualizo la fecha satisfactoriamente.',
        'success'
      )
    }, error => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Algo salio mal!',
        footer: '<p>' + error.message + '</p>'
      })
    })
  }

}
