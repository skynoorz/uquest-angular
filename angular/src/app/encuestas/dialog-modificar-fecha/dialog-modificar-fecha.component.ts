import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormGroup} from "@angular/forms";
import {FormlyFieldConfig, FormlyFormOptions} from "@ngx-formly/core";

@Component({
  selector: 'app-dialog-modificar-fecha',
  templateUrl: './dialog-modificar-fecha.component.html',
  styleUrls: ['./dialog-modificar-fecha.component.css']
})
export class DialogModificarFechaComponent implements OnInit {
  form = new FormGroup({});
  encuesta: { id: number };
  options: FormlyFormOptions = {
    formState: {
      awesomeIsForced: false,
    },
  };
  fields: FormlyFieldConfig[] = [
    {
      key: 'fini',
      type: 'datepicker',
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
      key: 'ffin',
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

  constructor(public dialogRef: MatDialogRef<DialogModificarFechaComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { id: number }) {
    this.encuesta = data;
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  modificarFechaBD() {
    console.log("envia fechas a bd: ", this.encuesta);
  }
}
