import {Component, OnInit} from '@angular/core';
import {Persona} from "./persona";
import {PersonaService} from "./persona.service";
import Swal from "sweetalert2";
import {tap} from "rxjs/operators";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";
import {ModalService} from "./detalle/modal.service";
import {AuthService} from "../usuarios/auth.service";

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css']
})
export class PersonasComponent implements OnInit {

  personas: Persona[]
  paginador: any;
  personaSeleccionado: Persona;

  //aca inicializamos el service
  constructor(private personaService: PersonaService,
              private activatedRoute: ActivatedRoute,
              private modalService: ModalService,
              public authService: AuthService) {
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');

      if (!page)
        page = 0;

      this.personaService.getPersonas(page)
        .pipe(
          tap(response => {
            console.log('ClientesComponent: tap 3');
            (response.content as Persona[]).forEach(persona => {
              console.log(persona.nombres);
            });
            // this.personas = personas
          })).subscribe(response => {
        this.personas = response.content as Persona[];
        this.paginador = response;
      });
    });
    this.modalService.notificarUpload.subscribe(persona => {
      this.personas = this.personas.map(personaOriginal => {
        if (persona.id == personaOriginal.id) {
          personaOriginal.foto = persona.foto;
        }
        return personaOriginal;
      })
    })
  }

  delete(persona: Persona): void {
    Swal.fire({
      title: 'Estas seguro?',
      text: "Esta decision eliminara todas las encuestas creadas por este persona!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminalo!'
    }).then((result) => {
      if (result.value) {
        this.personaService.delete(persona.id).subscribe(
          response => {
            this.personas = this.personas.filter(usu => usu !== persona)
            Swal.fire(
              'Eliminado!',
              `El persona ${persona.nombres} a sido eliminado`,
              'success'
            )
          }
        )
      }
    })
  }

  abrirModal(persona: Persona) {
    this.personaSeleccionado = persona;
    this.modalService.abrirModal();
  }

}
