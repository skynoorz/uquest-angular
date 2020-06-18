import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {ErrorStateMatcher} from "@angular/material/core";
import {Router} from "@angular/router";
import {PersonaService} from "../personas/persona.service";
import Swal from "sweetalert2";

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    // const isSubmitted = form && form.submitted;
    // return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    const invalidCtrl = !!(control && control.invalid);
    const invalidParent = !!(control && control.parent && control.parent.invalid);

    const isSubmitted = form && form.submitted;
    return (invalidCtrl && invalidParent && control.touched);
  }
}

@Component({
  selector: 'app-presign',
  templateUrl: './presign.component.html',
  styleUrls: ['./presign.component.css']
})
export class PresignComponent implements OnInit {

  titulo: string = "Registro";
  public errores: string[];
  flag: boolean = false;
  mensaje: string;

  formGroup = new FormGroup({
    usernameFormControl: new FormControl('', [
      Validators.required
    ]),
    passwordFormControl: new FormControl('', [
      Validators.required
    ])
  })
  // usernameFormControl = new FormControl('', [
  //   Validators.required
  // ]);
  // passwordFormControl = new FormControl('', [
  //   Validators.required,
  //   Validators.min(4),
  //   Validators.max(12)
  // ]);

  matcher = new MyErrorStateMatcher();


  constructor(private _formBuilder: FormBuilder,
              private router: Router,
              private personaService: PersonaService) {
  }

  ngOnInit(): void {

  }

  sendPersona(){
    console.log(this.formGroup)
    this.personaService.userExist(this.formGroup.get('usernameFormControl').value).subscribe((response)=>{
      if(response.respuesta){
        this.mensaje = response.mensaje;
        // Swal.fire("Ups","El usuario ya existe","info");
        this.flag = true;
        // console.log("flag: "+this.flag)
        // console.log("mensaje: "+this.mensaje)
      }
      else
        console.log("no existe")
    })
  }

}
