import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {Persona} from "../personas/persona";
import {PersonaService} from "../personas/persona.service";
import {Carrera} from "../personas/carrera";
import {CarreraService} from "../services/carrera.service";
import {Instituto} from "../personas/instituto";
import {ErrorStateMatcher} from "@angular/material/core";
import Swal from "sweetalert2";


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})


export class RegistroComponent implements OnInit {
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();

  isLinear = false;
  formGroup1: FormGroup;
  formGroup2: FormGroup;
  formGroup3: FormGroup;
  formGroup4: FormGroup;
  formGroup5: FormGroup;
  formGroup6: FormGroup;
  formGroup7: FormGroup;
  formGroup8: FormGroup;
  formGroup9: FormGroup;

  sexos: string[]= ["Masculino", "Femenino"];

  public persona: Persona = new Persona();

  public institutos: Instituto[];
  public carreras: Carrera[];
  public errores: string[];

  constructor(private _formBuilder: FormBuilder,
              private personaService: PersonaService,
              private carreraService: CarreraService) { }

  ngOnInit(): void {
    // this.institutos = [];
    this.carreraService.getCarreras().subscribe(carreras=>{this.carreras = carreras})
    this.persona.roles = [];
    // var role_admin = {"id": 2, "nombre": "ROLE_ADMIN"};
    // var role_user = {"id": 1, "nombre": "ROLE_USER"};
    // this.persona.roles.push(role_admin)

    // temporal
    this.persona.username= "nuevo";
    this.persona.password= "nuevo";

    this.formGroup1 = this._formBuilder.group({
      nombres: ['', Validators.required]
    });
    this.formGroup2 = this._formBuilder.group({
      appat: ['', Validators.required],
      apmat: ['', ""]
    });
    // this.formGroup3 = this._formBuilder.group({
    //   apmat: ['', Validators.required]
    // });
    this.formGroup4 = this._formBuilder.group({
      ci: ['', Validators.required]
    });
    this.formGroup5 = this._formBuilder.group({
      sexo: ['', Validators.required]
    });
    this.formGroup6 = this._formBuilder.group({
      fnac: ['', Validators.required]
    });
    this.formGroup7 = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
    this.formGroup8 = this._formBuilder.group({
      carrera: ['', Validators.required]
    });
    this.formGroup9 = this._formBuilder.group({
      instituto: ['', Validators.required]
    });
  }

  crear(): void{
    console.log(this.persona)
    console.log(this.persona.roles)
    this.personaService.create(this.persona).subscribe(
      response => {
        Swal.fire('Cliente Guardado', `${response.mensaje}: ${response.persona.nombres}`, 'success')
      },
      error => {
        this.errores = error.error.errors as string[];
        console.log('Codigo de error desde backend: '+error.status)
        console.log(error.error.errors)
      }
    )
  }

  cargaInstitutos() {
    // console.log("llamo a mi service y le envio mi carrera id: "+this.persona.carrera.id);
    this.carreraService.getInstitutosByCarreraId(this.persona.carrera.id).subscribe((institutos)=>{this.institutos = institutos});
  }

}
