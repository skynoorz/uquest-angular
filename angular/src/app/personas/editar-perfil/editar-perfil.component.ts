import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {PersonaService} from "../persona.service";
import {CarreraService} from "../../services/carrera.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormlyFieldConfig} from "@ngx-formly/core";
import Swal from "sweetalert2";
import {AuthService} from "../../usuarios/auth.service";

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html'
})
export class EditarPerfilComponent implements OnInit {

  user: any = {carreraId: 1, institutoId: 1};
  form = new FormGroup({});
  public errores: string[];
  minAge = new Date(new Date().getFullYear() - 18, new Date().getMonth(), new Date().getDate());
  titulo: string = "Editar";

  constructor(private _formBuilder: FormBuilder,
              private personaService: PersonaService,
              private carreraService: CarreraService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              public authService: AuthService,
  ) {
  }

  fields: FormlyFieldConfig[] = [
      {
        key: 'nombres',
        type: 'input',
        templateOptions: {
          label: 'Nombres',
          minLength: 4,
          maxLength: 22,
          required: true,
          pattern: /^[a-zA-Zñ\s]+$/
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
          minLength: 4,
          maxLength: 22,
          required: true,
          pattern: /^[a-zA-Zñ\s]+$/
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
          minLength: 4,
          maxLength: 22,
          pattern: /^[a-zA-Zñ\s]+$/,
          required: true
        },
        validation: {
          messages: {
            pattern: `El apellido no puede contener caracteres especiales como ser !@#$%^&*()]+$/ y tampoco números`
          },
        },
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
      }];

  ngOnInit(): void {
    this.cargarPersona();
  }

  cargarPersona(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params ['id']
      if (id) {
        this.personaService.getPersonaProfile(id).subscribe((user) => {
          this.user = user;
          this.user.carreraId = user.carrera.id;
          if (user.instituto)
            this.user.institutoId = user.instituto.id;
        })
      }
    })
  }

  cancelar() {
    this.router.navigate(['/profile'])
  }

  onSubmit(user: any) {
    this.form.dirty
    if (this.form.valid) {
      // creo persona model
      user.carrera = {id: user.carreraId};
      user.instituto = {id: user.institutoId};
      this.personaService.updateProfile(this.user).subscribe(
        () => {
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
