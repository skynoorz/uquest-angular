import {Component, Inject, Input, OnInit} from '@angular/core';
import {AuthService} from "../../usuarios/auth.service";
import {PersonaService} from "../persona.service";
import {Persona} from "../../classes/persona";
import {ActivatedRoute, Router} from "@angular/router";
import Swal from "sweetalert2";
import {HttpEventType} from "@angular/common/http";
import {ModalService} from "../detalle/modal.service";
import {environment} from "../../../environments/environment";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  persona: Persona = new Persona();
  basePath: string = environment.basePath;

  titulo: string = "Detalle Persona";
  progreso: number = 0;
  public fotoSeleccionada: File;

  constructor(public modalService: ModalService,
              public authService: AuthService,
              private personaService: PersonaService,
              private router: Router,
              // @Inject(MAT_DIALOG_DATA) public data: Persona
  ) {
    // if (data!=null){
    //   this.persona = data;
    // }
  }

  ngOnInit(): void {
    this.cargarUsuario();
  }

  private cargarUsuario() {
    this.personaService.getPersonaProfile(JSON.parse(localStorage.getItem("persona")).id).subscribe(persona => {
      this.persona = persona;
      // console.log(this.persona)
    })
  }

  editar() {
    var id = JSON.parse(localStorage.getItem("persona")).id;
    this.router.navigate([`/profile/editar/${id}`])
  }

  seleccionarFoto(event) {
    this.fotoSeleccionada = event.target.files[0];
    this.progreso = 0;
    // console.log(this.fotoSeleccionada);
    if (this.fotoSeleccionada.type.indexOf('image') < 0) {
      Swal.fire('Error', 'El archivo debe ser de tipo imagen', 'error');
    }
  }

  subirFoto() {
    if (!this.fotoSeleccionada) {
      Swal.fire('Error', 'Debe seleccionar una foto', 'warning');
    } else {
      // console.log(this.persona.id)
      this.personaService.subirFoto(this.fotoSeleccionada, this.persona.id)
        .subscribe(event => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progreso = Math.round((event.loaded / event.total) * 100);
            // console.log("entra al if")
          } else if (event.type === HttpEventType.Response) {
            // console.log("entra al else")
            let response: any = event.body;
            // this.persona = response.persona as Persona;

            // this.modalService.notificarUpload.emit(this.persona);
            Swal.fire('La foto se subio correctamente!', 'Su foto se actualizara en el siguiente inicio de sesion!', 'success')
          }
          // this.persona = persona;
        });
    }
  }
}
