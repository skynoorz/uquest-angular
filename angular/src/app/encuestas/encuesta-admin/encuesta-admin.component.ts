import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {EncuestasService} from "../../services/encuestas.service";
import {Encuesta} from "../../classes/encuesta";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import Swal from "sweetalert2";
import {EncuestaUsuario} from "../../classes/encuesta-usuario";
import {environment} from "../../../environments/environment";
import {MatDialog} from "@angular/material/dialog";
import {DetalleComponent} from "../../personas/detalle/detalle.component";
import {ModalService} from "../../personas/detalle/modal.service";
import {Persona} from "../../classes/persona";
import {Perfil2Component} from "../../personas/perfil2/perfil2.component";
import {AuthService} from "../../usuarios/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-encuesta-admin',
  templateUrl: './encuesta-admin.component.html',
  styleUrls: ['./encuesta-admin.component.css']
})
export class EncuestaAdminComponent implements OnInit, AfterViewInit  {
  displayedColumns: string[] = ['id', 'usuario', 'titulo','desc','tipo','editar'];
  dataSource: any;
  encuestas: EncuestaUsuario[] = [];
  isLoadingResults: boolean = true;
  personaSeleccionado: Persona;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  basePath: string = environment.basePath;

  constructor(private encuestaService: EncuestasService,
              public dialog: MatDialog,
              public modalService: ModalService,
              private authService: AuthService,
              private router: Router) { }

  ngAfterViewInit() {

  }

  ngOnInit(): void {
    if (this.authService.hasRole('ROLE_ADMIN')){
      this.cargarEncuestas();
    }else {
      Swal.fire("Acceso denegado","lo siento, no tienes acceso a este recurso", "warning")
      this.router.navigate(['/'])
    }

  }

  private cargarEncuestas() {
    this.encuestaService.getEncuestasTodas().subscribe(response=>{
      // console.log(response)
      this.encuestas = response;
      // console.log("This.encuestas",this.encuestas)
      this.dataSource = new MatTableDataSource<Encuesta>(this.encuestas);
      this.dataSource.paginator = this.paginator;
      this.isLoadingResults = false;
    })
  }

  editar(id: any, nombre: any, descripcion: any) {
      console.log("editar");
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
        this.encuestaService.delete(id).subscribe(response=>{
          Swal.fire(
            'Eliminado!',
            'La encuesta a sido eliminada.',
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
            footer: '<p>No se pudo eliminar la encuesta!</p>'
          })
        })
      }
    })
  }

  mostrarPerfilOpenDialog(usuario: any) {
    this.dialog.open(Perfil2Component,{
      width: '1000px',
      autoFocus: false,
      data: usuario
    })
  }
}
