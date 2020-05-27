import {Component, OnInit} from '@angular/core';
import {Usuario} from "./usuario";
import {UsuarioService} from "./usuario.service";
import Swal from "sweetalert2";
import {tap} from "rxjs/operators";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";
import {ModalService} from "./detalle/modal.service";

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[]
  paginador: any;
  usuarioSeleccionado: Usuario;

  //aca inicializamos el service
  constructor(private usuarioService: UsuarioService,
              private activatedRoute: ActivatedRoute,
              private modalService: ModalService) {
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
        let page: number = +params.get('page');

        if (!page)
          page = 0;

        this.usuarioService.getUsuarios(page)
          .pipe(
            tap(response => {
              console.log('ClientesComponent: tap 3');
              (response.content as Usuario[]).forEach(usuario => {
                console.log(usuario.nombres);
              });
              // this.usuarios = usuarios
            })).subscribe(response => {
          this.usuarios = response.content as Usuario[];
          this.paginador = response;
        });
      });
    this.modalService.notificarUpload.subscribe(usuario =>{
      this.usuarios.map(usuarioOriginal =>{
        if (usuario.id == usuarioOriginal.id){
          usuarioOriginal.foto = usuario.foto;
        }
        return usuarioOriginal;
      })
    })
  }

  delete(usuario: Usuario): void {
    Swal.fire({
      title: 'Estas seguro?',
      text: "Esta decision eliminara todas las encuestas creadas por este usuario!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminalo!'
    }).then((result) => {
      if (result.value) {
        this.usuarioService.delete(usuario.id).subscribe(
          response => {
            this.usuarios = this.usuarios.filter(usu => usu !== usuario)
            Swal.fire(
              'Eliminado!',
              `El usuario ${usuario.nombres} a sido eliminado`,
              'success'
            )
          }
        )
      }
    })
  }

  abrirModal(usuario: Usuario){
    this.usuarioSeleccionado = usuario;
    this.modalService.abrirModal();
  }

}
