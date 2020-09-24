import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../usuarios/auth.service";
import {PersonaService} from "../persona.service";
import {Persona} from "../persona";

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  persona: Persona = new Persona();

  constructor(public authService: AuthService,
              private personaService: PersonaService) { }

  ngOnInit(): void {
    this.cargarUsuario();
  }

  private cargarUsuario() {
    this.personaService.getPersonaProfile(JSON.parse(sessionStorage.getItem("persona")).id).subscribe(persona=>{
      this.persona = persona;
      console.log(this.persona)
    })
  }

  editar() {
    console.log("Editar")
  }
}
