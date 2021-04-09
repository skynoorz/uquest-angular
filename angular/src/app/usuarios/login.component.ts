import {Component, NgZone, OnInit} from '@angular/core';
import {Persona} from "../classes/persona";
import Swal from "sweetalert2";
import {AuthService, preRegisterSubject$} from "./auth.service";
import {Router} from "@angular/router";
import {DomSanitizer} from "@angular/platform-browser";
import {MatIconRegistry} from "@angular/material/icon";

const googleLogoURL = "https://raw.githubusercontent.com/fireflysemantics/logo/master/Google.svg";

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
  isLoadingResults: boolean = false;
  authInstance: gapi.auth2.GoogleAuth;

  constructor(private authService: AuthService,
              private router: Router,
              private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer,
              private zone: NgZone) {
    this.persona = new Persona()
    this.matIconRegistry.addSvgIcon("logo",
      this.domSanitizer.bypassSecurityTrustResourceUrl(googleLogoURL));
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/personas'])
      Swal.fire("Login", `${this.authService.persona.username} ya te encuentras autenticado`, "info")
    }
    this.initGoogleAuth();
  }

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
        .init({client_id: '93146694805-a2vo8cv7f1bu6tq3c9ckg3dnvrinrql0.apps.googleusercontent.com'})
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
            // this.router.navigate(['/registro']);
            this.zone.run(() => {
              this.router.navigate(['/registro']);
            });
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
    this.authService.guardarPersonaLS(access_token);
    this.authService.guardarTokenLS(access_token);

    if (this.authService.hasRole("ROLE_ADMIN"))
      this.zone.run(() => {
        this.router.navigate(['/personas']);
      });
    else
      this.zone.run(() => {
        this.router.navigate(['/']);
      });

  }

  handleErrorLogin(error): void {
    // console.log('login error', error);
    if (error.status == 400 || error.status == 403) {
      Swal.fire("Error Login", "Usuario o clave incorrecta", 'error');
      this.isLoadingResults=false;
    }
  }

  login(): void {
    // console.log(this.persona);
    if (this.persona.username == null || this.persona.password == null) {
      Swal.fire("Error Login", "Username o password vacias!", "error");
    }
    //aca guardo en el session storage
    // this.authService.login(this.persona).subscribe(this.handleLoginResponse, this.handleErrorLogin)
    this.isLoadingResults = true;
    this.authService.login(this.persona).subscribe(resp => {
      this.isLoadingResults = false;
      // console.log("resp: ",resp)
      this.handleLoginResponse(resp)
    }, this.handleErrorLogin)
  }

  redirectRegister() {
    // console.log("redirect")
    this.router.navigate(['/registro'])
  }
}
