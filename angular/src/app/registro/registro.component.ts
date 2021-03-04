import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PersonaService} from "../personas/persona.service";
import {Carrera} from "../classes/carrera";
import {CarreraService} from "../services/carrera.service";
import {Instituto} from "../classes/instituto";
import Swal from "sweetalert2";
import {FormlyFieldConfig} from "@ngx-formly/core";
import {startWith, map, tap, switchMap} from "rxjs/operators";
import {Router} from "@angular/router";


export function minAgeValidatorMessage(control: FormControl, date: Date): boolean {
  return (new Date(control.value) < date);
}

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  user: any = {carreraId: 1};
  form = new FormGroup({
    recaptcha: new FormControl('', Validators.required)
  });
  public errores: string[];
  isLoading: boolean = false;

  minAge = new Date(new Date().getFullYear() - 18, new Date().getMonth(), new Date().getDate());
  siteKey: string;


  verificaCarrera(carreraId) {
    if (this.carreraService.getInstitutosByCarreraId(carreraId))
      return true;
    return false;
  }

  fields: FormlyFieldConfig[] = [{
    validators: {
      validation: [
        { name: 'fieldMatch', options: { errorPath: 'passwordConfirm' } },
      ],
    },
    fieldGroup:[
      {
        key: 'nombres',
        type: 'input',
        templateOptions: {
          label: 'Nombres',
          minLength: 4,
          maxLength: 22,
          required: true,
          pattern: /^[a-zA-Z!@#$%^&*()]+$/
        },
        validation: {
          messages: {
            pattern: `El nombre no puede contener caracteres especiales como ser !@#$%^&*()]+$/ y tampoco números`
          },
        },
      },
      {
        key: 'apellidoPat',
        type: 'input',
        templateOptions: {
          label: 'Apellido paterno',
          required: true,
          pattern: /^[a-zA-Z!@#$%^&*()]+$/
        },
        validation: {
          messages: {
            pattern: `El apellido no puede contener caracteres especiales como ser !@#$%^&*()]+$/ y tampoco números`
          },
        },
      },
      {
        key: 'apellidoMat',
        type: 'input',
        templateOptions: {
          label: 'Apellido materno',
          pattern: /^[a-zA-Z!@#$%^&*()]+$/,
          required: true
        },
        validation: {
          messages: {
            pattern: `El apellido no puede contener caracteres especiales como ser !@#$%^&*()]+$/ y tampoco números`
          },
        },
      },
      {
        key: 'ci',
        type: 'input',
        templateOptions: {
          label: 'CI',
          max: 99999999,
          min: 1000000,
          type: 'number',
          required: true
        },
        validation: {
          messages: {
            min: `Su cedula de identidad debe tener al menos 7 digitos`,
            max: `Su cedula de identidad debe tener un maximo de 8 digitos`,
          },
        },
        asyncValidators: {
          uniqueUsername: {
            expression: (control: FormControl) => this.personaService.ciExists(control.value).toPromise(),
            message: 'Cedula de identidad ya existente',
          },
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
          required: true,
          datepickerOptions: {
            max: new Date(),
            startView: "multi-year"
          }
        },
        validators: {
          age: {
            expression: (control: FormControl) => {
              return (new Date(control.value) < this.minAge)
            },
            message: 'Usted tiene que ser mayor de edad.',
          },
        },
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
          // pattern: /[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/igm,
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
          label: 'Usuario (nombre público)',
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
          label: 'Contraseña',
          maxLength: 60,
          required: true
        }
      },
      {
        key: 'passwordConfirm',
        type: 'input',
        templateOptions: {
          type: 'password',
          label: 'Confirme contraseña',
          placeholder: 'Confirme su contraseña',
          required: true,
        }
      },
    ]
  }
  ];

  constructor(private _formBuilder: FormBuilder,
              private personaService: PersonaService,
              private carreraService: CarreraService,
              private router: Router) {
    this.siteKey = '6Le3v2oaAAAAAKXBwA-bweH_Rrl8YvmP9TSKCAT1';
  }

  ngOnInit(): void {

  }

  onSubmit(user: any) {
    console.log('user', user);
    // creo persona model
    this.user.carrera = {id: user.carreraId};
    this.user.instituto = {id: user.institutoId};
    this.isLoading = true;
    console.log("registro:", user)
    this.personaService.create(this.user).subscribe(
      response => {
        Swal.fire('Finalizado', `Se realizó el registro satisfactoriamente, porfavor revise su correo electronico para validar su cuenta!`, 'success')
        this.isLoading = false;
        this.router.navigate(['/login'])
      },
      error => {
        this.errores = error.error.errors as string[];
        console.log('Codigo de error desde backend: ' + error.status)
        console.log(error.error.errors)
      }
    );
  }

}
