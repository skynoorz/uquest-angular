import {Component, OnInit} from '@angular/core';
import {Usuario} from "./usuario";
import {UsuarioService} from "./usuario.service";
import Swal from "sweetalert2";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[]

  //aca inicializamos el service
  constructor(private usuarioService: UsuarioService) {
  }

  ngOnInit() {
    this.usuarioService.getUsuarios().pipe(tap(
      usuarios => this.usuarios = usuarios
    )).subscribe();
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

}
