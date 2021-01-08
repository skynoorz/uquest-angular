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
  isChecked: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
    this.persona = new Persona()
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/personas'])
      Swal.fire("Login", `${this.authService.persona.username} ya te encuentras autenticado`, "info")
    }
  }

  isRememberMeChecked(): boolean{
    return this.isChecked;
  }

  login(): void {
    console.log(this.persona);
    if (this.persona.username == null || this.persona.password == null) {
      Swal.fire("Error Login", "Username o password vacias!", "error");
    }
    //aca guardo en el session storage
    this.authService.login(this.persona).subscribe(response => {
      console.log(response);

      // ANTES

      if (this.isRememberMeChecked()){
        this.authService.guardarPersonaLS(response.access_token);
        this.authService.guardarTokenLS(response.access_token);
      }else {
        this.authService.guardarPersonaSS(response.access_token);
        this.authService.guardarTokenSS(response.access_token);
      }


      let usuario = this.authService.persona;

      // let rols: Rol = new Rol();
      // rols.nombre = "ROLE_ADMIN";
      console.log("hasRole: "+this.authService.hasRole("ROLE_ADMIN"))
      if (this.authService.hasRole("ROLE_ADMIN"))
        this.router.navigate(['/personas'])
      else
        this.router.navigate(['/'])
      Swal.fire('Login', `Hola ${usuario.nombres}, Bienvenido!`, "success")
    }, error => {
      if (error.status == 400) {
        Swal.fire("Error Login", "Usuario o clave incorrecta", 'error');
      }
    })
  }

}
