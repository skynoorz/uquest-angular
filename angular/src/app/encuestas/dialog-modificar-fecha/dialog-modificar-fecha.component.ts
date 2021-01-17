import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, ValidationErrors} from "@angular/forms";
import {FormlyFieldConfig, FormlyFormOptions} from "@ngx-formly/core";
import {EncuestasService} from "../../services/encuestas.service";
import {Encuesta} from "../../classes/encuesta";
import Swal from "sweetalert2";

@Component({
  selector: 'app-dialog-modificar-fecha',
  templateUrl: './dialog-modificar-fecha.component.html',
  styleUrls: ['./dialog-modificar-fecha.component.css']
})

export class DialogModificarFechaComponent implements OnInit {
  encuesta: Encuesta;

  form = new FormGroup({});
  options: FormlyFormOptions = {
    formState: {
      awesomeIsForced: false,
    },
  };
  fields: FormlyFieldConfig[] = [
    {
      key: 'fechaIni',
      type: 'rangepicker',
      templateOptions: {
        label: 'Fecha de inicio',
        datepickerOptions: {
          min: new Date(),
          max: new Date(new Date().setFullYear(new Date().getFullYear() + 1))
        },
        required: true
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
      }
    }
  ]

  checkDates(group: FormGroup) {

    if(group.controls.endDate.value < group.controls.startDate.value) {
      return { notValid:true }
    }
    return null;
  }

  ngOnInit(): void {

  }

  constructor(public dialogRef: MatDialogRef<DialogModificarFechaComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { id: number },
              private encuestaService: EncuestasService) {
    this.encuestaService.getEncuesta(data.id).subscribe(encuesta=>{
        this.encuesta = encuesta;
    })
  }

  modificarFechaBD() {

    this.encuestaService.save(this.encuesta).subscribe(response=>{
      this.dialogRef.close();
      Swal.fire(
        'Actualizado!',
        'Se actualizo la fecha satisfactoriamente.',
        'success'
      )
    },error => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Algo salio mal!',
        footer: '<p>'+error.message+'</p>'
      })
    })
  }
}
