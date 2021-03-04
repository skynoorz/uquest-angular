import {Component, Inject, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {FormlyFieldConfig} from "@ngx-formly/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import Swal from "sweetalert2";
import {Instituto} from "../../classes/instituto";
import {InstitutoService} from "../../services/instituto.service";

@Component({
  selector: 'app-instituto-form',
  templateUrl: './instituto-form.component.html',
  styleUrls: ['./instituto-form.component.css']
})
export class InstitutoFormComponent implements OnInit {

  instituto: Instituto = new Instituto();
  carreraId: number;
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
        key: 'sigla',
        type: 'input',
        templateOptions: {
          label: 'Sigla',
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

  constructor(public dialogRef: MatDialogRef<InstitutoFormComponent>,
              private institutoService: InstitutoService,
              @Inject(MAT_DIALOG_DATA) public data: any ) {
    if (data.idInstituto != null) {
      this.institutoService.getInstitutoById(data.idInstituto).subscribe(i => {
        // console.log("carrera id: ", data.idCarrera, i)
        // console.log("Instituto id: ", data.idInstituto, i)
        this.carreraId = data.idCarrera
        this.instituto = i;
      })
    }else {
      // console.log("no hay idInsti")
      if (data.idCarrera != null){

        this.carreraId = data.idCarrera;
      }
    }
  }

  ngOnInit(): void {
  }

  sendInstituto() {
    const institutoSend = {...this.instituto, ...{"carrera": {id: this.carreraId}}};
    // console.log("envio backend: ",institutoSend)
    this.institutoService.save(institutoSend).subscribe(e => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Se actualizó el instituto correctamente.',
        showConfirmButton: false,
        timer: 1500
      })
      this.dialogRef.close();
    },error => {
      console.error(error.error.error);
    })
  }

}
