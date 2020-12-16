import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {PersonaService} from "../personas/persona.service";
import {Carrera} from "../classes/carrera";
import {CarreraService} from "../services/carrera.service";
import {Instituto} from "../classes/instituto";
import Swal from "sweetalert2";
import { FormlyFieldConfig } from "@ngx-formly/core";
import { startWith, map, tap, switchMap } from "rxjs/operators";
import {Router} from "@angular/router";


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  user: any = { carreraId: 1};
  form = new FormGroup({});
  public errores: string[];

  verificaCarrera (carreraId){
    if (this.carreraService.getInstitutosByCarreraId(carreraId))
      return true;
    return false;
  }

  fields: FormlyFieldConfig[] = [
    {
      key: 'nombres',
      type: 'input',
      templateOptions: {
        label: 'Nombres',
        minLength: 4,
        maxLength: 22,
        required: true
      }
    },
    {
      key: 'apellidoPat',
      type: 'input',
      templateOptions: {
        label: 'Apellido paterno',
        required: true
      }
    },
    {
      key: 'apellidoMat',
      type: 'input',
      templateOptions: {
        label: 'Apellido materno',
        required: true
      }
    },
    {
      key: 'ci',
      type: 'input',
      templateOptions: {
        label: 'CI',
        maxLength: 8,
        required: true
      }
    },
    {
      key: 'sexo',
      type: 'select',
      templateOptions: {
        label: 'Sexo',
        options: [
          {label: 'Masculino', value: 'Masculino'},
          {label: 'Femenino', value: 'Femenino'},
        ],
        required: true
      }
    },
    {
      key: 'fnac',
      type: 'datepicker',
      templateOptions: {
        label: 'Fecha de nacimiento',
        required: true
      }
    },
    {
      key: 'carreraId',
      type: 'select',
      templateOptions: {
        label: 'Carrera',
        options: this.carreraService.getCarreras(),
        valueProp: 'id',
        labelProp: 'nombre',
        required: true
      },
      // hooks:{
      //   onChanges: field => {
      //     const institutoControl = this.form.get('institutoId');
      //     console.log(institutoControl.value);
      //     console.log(field);
      //   }
      // }
    },
    {
      key: 'institutoId',
      type: 'select',
      templateOptions: {
        label: 'Instituto',
        options: [],
        valueProp: 'id',
        labelProp: 'nombre'
      },
      hooks: {
        onInit: field => {
          const carreraControl = this.form.get('carreraId');
          field.templateOptions.options = carreraControl.valueChanges.pipe(
            startWith(carreraControl.value),
            switchMap(carreraId => this.carreraService.getInstitutosByCarreraId(carreraId)),
            tap(() => {
              field.formControl.setValue(null);

            }),
          );
        },
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
      asyncValidators: {
        uniqueUsername: {
          expression: (control: FormControl) => this.personaService.emailExist(control.value).toPromise(),
          message: 'Correo ya existente',
        },
      }
    },
    {
      key: 'username',
      type: 'input',
      templateOptions: {
        label: 'Username',
        maxLength: 30,
        required: true
      },
      modelOptions: {
        updateOn: 'blur',
      },
      asyncValidators: {
        uniqueUsername: {
          expression: (control: FormControl) => this.personaService.userExist(control.value).toPromise(),
          message: 'Usuario ya existente',
        },
      }
    },
    {
      key: 'password',
      type: 'input',
      templateOptions: {
        type: 'password',
        label: 'Password',
        maxLength: 60,
        required: true
      }
    }
  ];

  constructor(private _formBuilder: FormBuilder,
              private personaService: PersonaService,
              private carreraService: CarreraService,
              private router: Router) { }

  ngOnInit(): void {

  }

  onSubmit(user: any) {
    console.log('user', user);
    // creo persona model
    user.carrera = {id: user.carreraId};
    user.instituto = {id: user.institutoId};
    this.personaService.create(this.user).subscribe(
      response => {
        Swal.fire('Cliente Guardado', `${response.mensaje}`, 'success')
        this.router.navigate(['/login'])
      },
      error => {
        this.errores = error.error.errors as string[];
        console.log('Codigo de error desde backend: '+error.status)
        console.log(error.error.errors)
      }
    );
  }

}
