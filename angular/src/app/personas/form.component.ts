import {Component, OnInit} from '@angular/core';
import {Persona} from "../classes/persona";
import {PersonaService} from "./persona.service";
import {ActivatedRoute, Router} from "@angular/router";
import Swal from "sweetalert2";
import {Carrera} from "../classes/carrera";
import {Instituto} from "../classes/instituto";

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
  roles: string[];

  ngOnInit(): void {
    this.cargarPersona()
    this.personaService.getCarreras().subscribe(carreras=>{this.carreras = carreras})
    this.personaService.getInstitutos().subscribe(institutos=>{this.institutos = institutos})
    this.personaService.getRoles().subscribe(roles =>{this.roles = roles})
  }

  constructor(private personaService: PersonaService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }



  cargarPersona(): void {

    this.activatedRoute.params.subscribe(params => {
      let id = params ['id']
      if (id) {
        this.personaService.getPersona(id).subscribe((persona) => this.persona = persona)
        console.log(id)
        console.log("Persona que encuentra: "+this.personaService.getPersona(id));
        console.log("Persona registrada: "+this.persona)
      }
    })
  }

  public create(): void {
    console.log(this.persona)
    this.personaService.create(this.persona).subscribe(
      response => {
        this.router.navigate(['/personas'])
        Swal.fire('Felicidades usted creo su cuenta satisfactoriamente', `${response.mensaje}: ${response.persona.nombres}`, 'success')
      },
      error => {
        this.errores = error.error.errors as string[];
        console.log('Codigo de error desde backend: '+error.status)
        console.log(error.error.errors)
      }
    )
  }

  public update(): void{
    console.log("Persona: "+this.persona)
    this.personaService.update(this.persona).subscribe(
      response =>{
        Swal.fire('Cliente actualizado', `${response.mensaje}: ${response.persona.nombres}`, 'success')
        this.router.navigate(['/personas'])
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

  compararInstituto(o1: Instituto, o2: Instituto): boolean{
    if (o1 === undefined && o2 === undefined)
      return true;
    return o1 == null || o2 == null? false: o1.id == o2.id;
  }

}
