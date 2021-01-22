import { Component, OnInit } from '@angular/core';
import {CategoriaService} from "../../services/categoria.service";
import {Categoria} from "../../classes/categoria";
import {AuthService} from "../../usuarios/auth.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {MatDialog} from "@angular/material/dialog";
import {CategoriasEditarComponent} from "../categorias-editar/categorias-editar.component";

@Component({
  selector: 'app-categorias-listar',
  templateUrl: './categorias-listar.component.html',
  styleUrls: ['./categorias-listar.component.css']
})
export class CategoriasListarComponent implements OnInit {

  constructor(private categoriaService: CategoriaService,
              private authService: AuthService,
              private router: Router,
              public dialog: MatDialog) { }
  categorias: Categoria[] = []
  displayedColumns: string[] = ['id', 'nombre', 'descripcion', 'editar'];

  ngOnInit(): void {
    if (this.authService.hasRole('ROLE_ADMIN')){
      this.cargarCategorias();
    }else {
      Swal.fire("Acceso denegado","lo siento, no tienes acceso a este recurso", "warning")
      this.router.navigate(['/'])
    }
  }

  cargarCategorias(){
    this.categoriaService.getCategorias().subscribe(categorias=>{
      this.categorias = categorias;
    })
  }

  editarOpenDialog(id: number, nombre: string, descripcion: string) {
    this.dialog.open(CategoriasEditarComponent, {
      width: '500px',
      data: {id: id, nombre: nombre, descripcion: descripcion}
    })
  }

  eliminar(id: any) {
    Swal.fire({
      title: 'Estas seguro?',
      text: "Es posible que no puedas revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminalo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoriaService.delete(id).subscribe(response=>{
          Swal.fire(
            'Eliminado!',
            'La categoria a sido eliminada.',
            'success'
          )
        }, error => {
          console.log(error.error.mensaje);
          Swal.fire(
            'Error!',
            error.error.mensaje+', codigo: '+error.status,
            'error',
          )
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: error.error.mensaje+', codigo: '+error.status,
            footer: '<p>Puede que la categoria a la que se desea eliminar este siendo utilizada por una encuesta!</p>'
          })
        })
      }
    })
  }

  agregarOpenDialog() {
    this.dialog.open(CategoriasEditarComponent, {
      width: '500px'
    })
  }
}
