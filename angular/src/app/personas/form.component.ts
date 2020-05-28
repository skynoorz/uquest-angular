import {Component, OnInit} from '@angular/core';
import {Persona} from "./persona";
import {PersonaService} from "./persona.service";
import {ActivatedRoute, Router} from "@angular/router";
import Swal from "sweetalert2";
import {Carrera} from "./carrera";
import {Instituto} from "./instituto";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  titulo: string = "Crear Cliente"

  public persona: Persona = new Persona();
  public errores: string[];

  carreras: Carrera[];
  institutos: Instituto[];

  constructor(private personaService: PersonaService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.cargarPersona()
    this.personaService.getCarreras().subscribe(carreras=>{this.carreras = carreras})
    this.personaService.getInstitutos().subscribe(institutos=>{this.institutos = institutos})
  }

  cargarPersona(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params ['id']
      if (id) {
        this.personaService.getPersona(id).subscribe((persona) => this.persona = persona)
      }
    })
  }

  public create(): void {
    console.log(this.persona)
    this.personaService.create(this.persona).subscribe(
      response => {
        this.router.navigate(['/personas'])
        Swal.fire('Cliente Guardado', `${response.mensaje}: ${response.persona.nombres}`, 'success')
      },
      error => {
        this.errores = error.error.errors as string[];
        console.log('Codigo de error desde backend: '+error.status)
        console.log(error.error.errors)
      }
    )
  }

  public update(): void{
    console.log(this.persona)
    this.personaService.update(this.persona).subscribe(
      response =>{
        this.router.navigate(['/personas'])
        Swal.fire('Cliente actualizado', `${response.mensaje}: ${response.persona.nombres}`, 'success')
      },
      error => {
        this.errores = error.error.errors as string[];
        console.log('Codigo de error desde backend: '+error.status)
        console.log(error.error.errors)
      }
    )
  }

  compararCarrera(o1: Carrera, o2: Carrera): boolean{
    if (o1 === undefined && o2 === undefined)
      return true;
    return o1 == null || o2 == null? false: o1.id == o2.id;
  }

}