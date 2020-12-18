import {Component, Input, OnInit} from '@angular/core';
import {Persona} from "../../classes/persona";
import {PersonaService} from "../persona.service";
import {ActivatedRoute} from "@angular/router";
import Swal from "sweetalert2";
import {HttpEventType} from "@angular/common/http";
import {ModalService} from "./modal.service";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'detalle-persona',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  @Input() persona: Persona;
  titulo: string = "Detalle Persona";
  progreso: number = 0;
  public fotoSeleccionada: File;
  basePath: string= environment.basePath;

  constructor(private personaService: PersonaService,
              private activatedRoute: ActivatedRoute,
              public modalService: ModalService) {
  }

  ngOnInit(): void {

  }

  seleccionarFoto(event) {
    this.fotoSeleccionada = event.target.files[0];
    this.progreso = 0;
    console.log(this.fotoSeleccionada);
    if (this.fotoSeleccionada.type.indexOf('image') < 0) {
      Swal.fire('Error', 'El archivo debe ser de tipo imagen', 'error');
    }
  }

  subirFoto() {
    if (!this.fotoSeleccionada) {
      Swal.fire('Error', 'Debe seleccionar una foto', 'warning');
    } else {
      this.personaService.subirFoto(this.fotoSeleccionada, this.persona.id)
        .subscribe(event => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progreso = Math.round((event.loaded / event.total) * 100);
            // console.log("entra al if")

          } else if (event.type === HttpEventType.Response) {
            // console.log("entra al else")
            let response: any = event.body;
            this.persona = response.persona as Persona;

            this.modalService.notificarUpload.emit(this.persona);
            Swal.fire('La foto se subio correctamente!', response.mensaje, 'success')
          }
          // this.persona = persona;
        });
    }
  }
  cerrarModal(){
    this.modalService.cerrarModal();
    this.fotoSeleccionada = null;
    this.progreso = 0;
  }
}
