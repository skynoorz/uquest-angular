import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Carrera} from "../../classes/carrera";
import {CarreraService} from "../../services/carrera.service";
import {FormlyFieldConfig} from "@ngx-formly/core";
import {FormGroup} from "@angular/forms";
import Swal from "sweetalert2";

@Component({
  selector: 'app-carrera-form',
  templateUrl: './carrera-form.component.html',
  styleUrls: ['./carrera-form.component.css']
})
export class CarreraFormComponent implements OnInit {

  carrera: Carrera = new Carrera();
  form = new FormGroup({});
  fields: FormlyFieldConfig[] = [{
    fieldGroup: [
      {
        key: 'nombre',
        type: 'input',
        templateOptions: {
          label: 'Nombre',
          required: true,
        },
      },
      {
        key: 'direccion',
        type: 'input',
        templateOptions: {
          label: 'Direccion',
          required: true
        },
      },
      {
        key: 'fono',
        type: 'input',
        templateOptions: {
          label: 'Teléfono',
          type: 'number',
          required: true
        },
      },
      {
        key: 'email',
        type: 'input',
        templateOptions: {
          label: 'Email',
          pattern: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
          required: true,
        },
        validation: {
          messages: {
            pattern: (error, field: FormlyFieldConfig) => `"${field.formControl.value}" no es una email valida`,
          },
        },
        modelOptions: {
          updateOn: 'blur',
        },
      }
    ]
  }];

  constructor(public dialogRef: MatDialogRef<CarreraFormComponent>,
              private carreraService: CarreraService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    if (data != null) {
      this.carreraService.getCarreraByid(data.id).subscribe(c => {
        this.carrera = c;
      })
    }
  }

  ngOnInit(): void {
  }

  modificarCarrera() {
    if (this.carrera.institutos) {
      const institutosNew: any[] = [];
      this.carrera.institutos.map(e => {
        let instituto: any;
        // agrego el id a los institutos que posee cada carrera para evitar la deserializacion en JPA
        instituto = {...e, ...{carrera: {id: this.carrera.id}}};
        institutosNew.push(instituto)
      })
      this.carrera.institutos = institutosNew;
    }
    this.carreraService.saveCarrera(this.carrera).subscribe(e => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Se actualizó la carrera correctamente.',
        showConfirmButton: false,
        timer: 1500
      })
      this.dialogRef.close(e.carrera);
    })
  }
}
