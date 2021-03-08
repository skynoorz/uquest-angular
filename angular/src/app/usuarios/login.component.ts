import {Component, OnInit} from '@angular/core';
import {Persona} from "../classes/persona";
import Swal from "sweetalert2";
import { AuthService, preRegisterSubject$ } from "./auth.service";
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
  gapiSetup = false;
  authInstance: gapi.auth2.GoogleAuth;

  constructor(private authService: AuthService, private router: Router) {
    this.persona = new Persona()
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/personas'])
      Swal.fire("Login", `${this.authService.persona.username} ya te encuentras autenticado`, "info")
    }
    this.initGoogleAuth();
  }

  // isRememberMeChecked(): boolean{
  //   return this.isChecked;
  // }

  async initGoogleAuth(): Promise<void> {
    //  Create a new Promise where the resolve
    // function is the callback passed to gapi.load
    const pload = new Promise((resolve) => {
      gapi.load('auth2', resolve);
    });

    // When the first promise resolves, it means we have gapi
    // loaded and that we can call gapi.init
    return pload.then(async () => {
      await gapi.auth2
        .init({ client_id: 'CLIENT_ID_TO_REPLACE' })
        .then(auth => {
          this.gapiSetup = true;
          this.authInstance = auth;
        });
    });
  }

  async googleLogin(): Promise<gapi.auth2.GoogleUser> {
    // Initialize gapi if not done yet
    if (!this.gapiSetup) {
      await this.initGoogleAuth();
    }

    // Resolve or reject signin Promise
    return new Promise(async () => {
      await this.authInstance.grantOfflineAccess()
        .then(resp => this.authService.socialLogin(resp.code).toPromise())
        .then((resp: any) => {
          if (resp.usuario) {
            preRegisterSubject$.next(resp.usuario);
            this.router.navigate(['/registro']);
          } else {
            this.handleLoginResponse(resp.token)
          }
        })
        .catch(this.handleErrorLogin);
    });
  }

  handleLoginResponse(response): void {
    const access_token = response.id_token;
    this.authService.guardarPersonaSS(access_token);
    this.authService.guardarTokenSS(access_token);

    if (this.authService.hasRole("ROLE_ADMIN"))
      this.router.navigate(['/personas'])
    else
      this.router.navigate(['/'])
  }

  handleErrorLogin(error): void {
    console.log('login error', error);
    if (error.status == 400) {
      Swal.fire("Error Login", "Usuario o clave incorrecta", 'error');
    }
  }

  login(): void {
    // console.log(this.persona);
    if (this.persona.username == null || this.persona.password == null) {
      Swal.fire("Error Login", "Username o password vacias!", "error");
    }
    //aca guardo en el session storage
    this.authService.login(this.persona).subscribe(this.handleLoginResponse, this.handleErrorLogin)
  }

  redirectRegister() {
    console.log("redirect")
    this.router.navigate(['/registro'])
  }
}
