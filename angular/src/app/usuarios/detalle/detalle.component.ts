import {Component, Input, OnInit} from '@angular/core';
import {Usuario} from "../usuario";
import {UsuarioService} from "../usuario.service";
import {ActivatedRoute} from "@angular/router";
import Swal from "sweetalert2";
import {HttpEventType} from "@angular/common/http";
import {ModalService} from "./modal.service";

@Component({
  selector: 'detalle-usuario',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  @Input() usuario: Usuario;
  titulo: string = "Detalle Cliente";
  progreso: number = 0;
  public fotoSeleccionada: File;

  constructor(private usuarioService: UsuarioService,
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
      this.usuarioService.subirFoto(this.fotoSeleccionada, this.usuario.id)
        .subscribe(event => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progreso = Math.round((event.loaded / event.total) * 100);
            console.log("entra al if")

          } else if (event.type === HttpEventType.Response) {
            console.log("entra al else")
            let response: any = event.body;
            this.usuario = response.usuario as Usuario;

            this.modalService.notificarUpload.emit(this.usuario);
            Swal.fire('La foto se subio correctamente!', response.mensaje, 'success')
          }
          // this.usuario = usuario;
        });
    }
  }
  cerrarModal(){
    this.modalService.cerrarModal();
    this.fotoSeleccionada = null;
    this.progreso = 0;
  }
}
