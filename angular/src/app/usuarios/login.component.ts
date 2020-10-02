import {Component, OnInit} from '@angular/core';
import {Persona} from "../classes/persona";
import Swal from "sweetalert2";
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";
import {Rol} from "../classes/rol";
import { RegistroComponent } from "../registro/registro.component"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  titulo: string = "Porfavor Sign In"
  persona: Persona;

  constructor(private authService: AuthService, private router: Router) {
    this.persona = new Persona()
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/personas'])
      Swal.fire("Login", `${this.authService.persona.username} ya te encuentras autenticado`, "info")
    }
  }

  login(): void {
    console.log(this.persona);
    if (this.persona.username == null || this.persona.password == null) {
      Swal.fire("Error Login", "Username o password vacias!", "error");
    }
    //aca guardo en el session storage
    this.authService.login(this.persona).subscribe(response => {
      console.log(response);

      this.authService.guardarPersona(response.access_token);
      this.authService.guardarToken(response.access_token);

      let usuario = this.authService.persona;

      // let rols: Rol = new Rol();
      // rols.nombre = "ROLE_ADMIN";
      console.log("hasRole: "+this.authService.hasRole("ROLE_ADMIN"))
      if (this.authService.hasRole("ROLE_ADMIN"))
        this.router.navigate(['/personas'])
      else
        this.router.navigate(['/'])
      Swal.fire('Login', `Hola ${usuario.username}, has iniciado sesion con exito!`, "success")
    }, error => {
      if (error.status == 400) {
        Swal.fire("Error Login", "Usuario o clave incorrecta", 'error');
      }
    })
  }

}
