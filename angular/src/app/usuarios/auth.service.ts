import {Injectable} from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Persona} from "../classes/persona";
import {Rol} from "../classes/rol";
import {environment} from "../../environments/environment";

export const preRegisterSubject$ = new BehaviorSubject<any>(null);

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private urlEndpoint: string = "";
  private _persona: Persona;
  private _token: string;

  constructor(private http: HttpClient) {
  }

  public get persona(): Persona {
    // if (this._persona != null) {
    //   return this._persona;
    // } else if (this._persona == null || sessionStorage.getItem('persona') != null) {
    //   this._persona = JSON.parse(sessionStorage.getItem('persona')) as Persona;
    //   return this._persona;
    // }
    if (this._persona != null) {
      return this._persona;
    } else if (this._persona == null || localStorage.getItem('persona') != null) {
      this._persona = JSON.parse(localStorage.getItem('persona')) as Persona;
      return this._persona;
    }
    return new Persona();
  }

  public get token(): string {
    // if (this._token != null) {
    //   return this._token;
    // } else if (this._token == null || sessionStorage.getItem('token') != null) {
    //   this._token = sessionStorage.getItem('token');
    //   return this._token;
    // }
    if (this._token != null) {
      return this._token;
    } else if (this._token == null || localStorage.getItem('token') != null) {
      this._token = localStorage.getItem('token');
      return this._token;
    }
    return null;
  }


  login(persona: Persona): Observable<any> {
    const urlEndpoint = environment.basePath +'/api/login';


    // console.log(params.toString());
    const payload = {
      username: persona.username,
      password: persona.password
    }

    return this.http.post(urlEndpoint, payload )
  }

  socialLogin(code: string) {
    const urlEndpoint = environment.basePath +'/api/google/login';
    return this.http.post(urlEndpoint, { code });
  }

  guardarPersonaSS(accessToken: string): void {
    let payload = this.obtenerDatosToken(accessToken);
    this._persona = new Persona();
    this._persona.id = payload.id;
    this._persona.nombres = payload.nombres;
    this._persona.apellidoPat = payload.apellido_pat;
    this._persona.apellidoMat = payload.apellido_mat;
    this._persona.username = payload.user_name;
    this._persona.email = payload.email;
    this._persona.foto = payload.foto;
    this._persona.roles = payload.authorities;
    // console.log(this._persona)
    // console.log("authorities: " + payload.authorities)
    // this._persona.carrera = payload.carrera;
    // ACA GUARDO SESSION STORAGE
    sessionStorage.setItem('persona', JSON.stringify(this._persona));

  }

  guardarPersonaLS(accessToken: string): void {
    let payload = this.obtenerDatosToken(accessToken);
    this._persona = new Persona();
    this._persona.id = payload.id;
    this._persona.nombres = payload.nombres;
    this._persona.apellidoPat = payload.apellido_pat;
    this._persona.apellidoMat = payload.apellido_mat;
    this._persona.username = payload.user_name;
    this._persona.email = payload.email;
    this._persona.foto = payload.foto;
    this._persona.roles = payload.authorities;
    // console.log(this._persona)
    // console.log("authorities: " + payload.authorities)
    // this._persona.carrera = payload.carrera;
    // ACA GUARDO SESSION STORAGE
    localStorage.setItem('persona', JSON.stringify(this._persona));

  }

  guardarTokenSS(accessToken: string): void {
    this._token = accessToken;
    sessionStorage.setItem('token', accessToken);
  }

  guardarTokenLS(accessToken: string): void {
    this._token = accessToken;
    localStorage.setItem('token', accessToken);
  }


  obtenerDatosToken(accessToken: string): any {
    if (accessToken != null) {
      // console.log("Mi token"+accessToken)
      return JSON.parse(atob(accessToken.split(".")[1]));
    }
    return null;
  }

  isAuthenticated(): boolean {
    let payload = this.obtenerDatosToken(this.token);
    if (payload != null && payload.user_name && payload.user_name.length > 0)
      return true
    return false
  }

  logout(): void {
    this._token = null;
    this._persona = null;
    localStorage.clear();
  }

  // hasRole(role: Rol): boolean{
  hasRole(role: string): boolean {
    if (this.isAuthenticated()) {
      if (this.persona.roles != null) {
        for (let i = 0; i < this.persona.roles.length; i++)
          // @ts-ignore
          if (this.persona.roles[i] == role)
            return true;
        return false;
      }
      return false;
    }
    return false;
  }
}
