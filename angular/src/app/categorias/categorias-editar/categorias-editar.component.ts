import {Component, Inject, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {Categoria} from "../../classes/categoria";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CategoriaService} from "../../services/categoria.service";
import {FormlyFieldConfig} from "@ngx-formly/core";
import Swal from "sweetalert2";

@Component({
  selector: 'app-categorias-editar',
  templateUrl: './categorias-editar.component.html'
})
export class CategoriasEditarComponent implements OnInit {

  categoria: Categoria = new Categoria();
  form = new FormGroup({});
  fields: FormlyFieldConfig[] = [
    {
      key: 'nombre',
      type: 'input',
      templateOptions: {
        label: 'Nombre',
        required: true,

      },
    },
    {
      key: 'descripcion',
      type: 'input',
      templateOptions: {
        label: 'Descripcion',
        required: true
      },
    }
  ];


  constructor(public dialogRef: MatDialogRef<CategoriasEditarComponent>,
              private categoriaService: CategoriaService,
              @Inject(MAT_DIALOG_DATA) public data: Categoria) {
    if (data != null){
      this.categoria = data;
    }
  }

  ngOnInit(): void {
  }

  modificarCategoria() {
    console.log("envio a be: ",this.categoria)
    this.categoriaService.save(this.categoria).subscribe(response=>{
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Se guardo la categoria',
        showConfirmButton: false,
        timer: 1500
      })
      this.dialogRef.close();
    })
  }
}
