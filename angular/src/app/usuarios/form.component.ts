import {Component, OnInit} from '@angular/core';
import {Usuario} from "./usuario";
import {UsuarioService} from "./usuario.service";
import {ActivatedRoute, Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  titulo: string = "Crear Cliente"

  public usuario: Usuario = new Usuario();
  public errores: string[];

  constructor(private usuarioService: UsuarioService, private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.cargarUsuario()
  }

  cargarUsuario(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params ['id']
      if (id) {
        this.usuarioService.getUsuario(id).subscribe((usuario) => this.usuario = usuario)
      }
    })
  }

  public create(): void {
    this.usuarioService.create(this.usuario).subscribe(
      response => {
        this.router.navigate(['/usuarios'])
        Swal.fire('Cliente Guardado', `${response.mensaje}: ${response.usuario.nombres}`, 'success')
      },
      error => {
        this.errores = error.error.errors as string[];
        console.log('Codigo de error desde backend: '+error.status)
        console.log(error.error.errors)
      }
    )
  }

  public update(): void{
    this.usuarioService.update(this.usuario).subscribe(
      response =>{
        this.router.navigate(['/usuarios'])
        Swal.fire('Cliente actualizado', `${response.mensaje}: ${response.usuario.nombres}`, 'success')
      },
      error => {
        this.errores = error.error.errors as string[];
        console.log('Codigo de error desde backend: '+error.status)
        console.log(error.error.errors)
      }
    )
  }

}
