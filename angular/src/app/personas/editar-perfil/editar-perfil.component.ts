import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {PersonaService} from "../persona.service";
import {CarreraService} from "../../services/carrera.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormlyFieldConfig} from "@ngx-formly/core";
import {startWith, switchMap} from "rxjs/operators";
import Swal from "sweetalert2";
import {AuthService} from "../../usuarios/auth.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html'
})
export class EditarPerfilComponent implements OnInit {

  user: any = {carreraId: 1, institutoId: 1};
  private userBackup: any;

  userDefault: string;

  emailDefault: string;
  // any = { institutoId: 1};
  form = new FormGroup({});
  public errores: string[];
  titulo: string = "Editar";

  constructor(private _formBuilder: FormBuilder,
              private personaService: PersonaService,
              private carreraService: CarreraService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              public authService: AuthService,
              // @Inject(MAT_DIALOG_DATA) public data: Persona
  ) {
    // if (data != null){
    //   this.user = data;
    // }
  }

  fields: FormlyFieldConfig[] = [{
    validators: {
      validation: [
        {name: 'fieldMatch', options: {errorPath: 'passwordConfirm'}},
      ],
    },
    fieldGroup: [
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
              // tap(() => {
              //   field.formControl.setValue(null);
              //
              // }),
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
        asyncValidators: {
          uniqueEmail: {
            expression: (control: FormControl) => this.personaService.emailExist(control.value).toPromise(),
            message: 'Correo ya existente',
          },
        },
        validators: {
          equalToDefault: {
            expression: (control: FormControl) => this.isEqualToDefaultEmail(control.value),
            message: 'Correcto',
          }
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
          required: true,
        }
      },
      {
        key: 'passwordConfirm',
        type: 'input',
        templateOptions: {
          type: 'password',
          label: 'Confirme contraseña',
          maxLength: 60,
          placeholder: 'Confirme su contraseña',
          required: true,
        }
      }]
  }
  ];

  ngOnInit(): void {
    // this.user = { carreraId: 1}

    console.log(this.user)
    this.cargarPersona();
    // this.user.carreraId = this.user.carrera.id;
  }

  isEqualToDefaultEmail(email: string) {
    return email == this.emailDefault;
  }

  cargarPersona(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params ['id']
      if (id) {
        this.personaService.getPersonaProfile(id).subscribe((user) => {
          this.userDefault = user.username;
          this.emailDefault = user.email;
          user.password = null;
          this.user = user;
          this.user.password = null;
          this.userBackup = user;

          this.user.carreraId = user.carrera.id;
          if (user.instituto)
            this.user.institutoId = user.instituto.id;
          console.log(this.user);
        })
      }
    })
  }

  cancelar() {
    this.router.navigate(['/profile'])
  }

  onSubmit(user: any) {
    // if (this.form.valid) {
    if (true) {
      console.log('user to send', user);
      // creo persona model
      user.carrera = {id: user.carreraId};
      user.instituto = {id: user.institutoId};
      this.personaService.updateProfile(this.user).subscribe(
        response => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Tus cambios han sido guardados.',
            showConfirmButton: false,
            timer: 1500
          })
          this.router.navigate(['/profile'])
        },
        error => {
          this.errores = error.error.errors as string[];
          console.log('Codigo de error desde backend: ' + error.status)
          console.log(error.error.errors)
        }
      );
    }
  }

}
