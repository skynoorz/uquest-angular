import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Persona} from "../personas/persona";
import {Rol} from "../classes/rol";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private urlEndpoint: string = "";
  private _persona: Persona;
  private _token: string;

  constructor(private http: HttpClient) { }

  public get persona(): Persona{
    if (this._persona != null){
      return this._persona;
    } else if (this._persona == null || sessionStorage.getItem('persona') !=null){
      this._persona = JSON.parse(sessionStorage.getItem('persona')) as Persona;
      return this._persona;
    }
    return new Persona();
  }

  public get token(): string{
    if (this._token != null){
      return this._token;
    } else if (this._token == null || sessionStorage.getItem('token') !=null){
      this._token = sessionStorage.getItem('token');
      return this._token;
    }
    return null;
  }


  login(persona: Persona): Observable<any> {
    const urlEndpoint = 'http://localhost:8080/oauth/token';

    const credenciales = btoa('angularapp' + ':' + '12345');
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
      , 'Authorization': 'Basic ' + credenciales
    });

    let params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', persona.username);
    params.set('password', persona.password);

    console.log(params.toString());

    return this.http.post(urlEndpoint, params.toString(), {headers: httpHeaders})
  }

  guardarPersona(accessToken: string): void {
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
    console.log(this._persona)
    console.log("authorities: "+payload.authorities)
    // this._persona.carrera = payload.carrera;
    // ACA GUARDO SESSION STORAGE
    sessionStorage.setItem('persona',JSON.stringify(this._persona));

  }

  guardarToken(accessToken: string): void {
    this._token = accessToken;
    sessionStorage.setItem('token', accessToken);
  }

  obtenerDatosToken(accessToken: string): any{
    if (accessToken != null){
      // console.log("Mi token"+accessToken)
      return  JSON.parse(atob(accessToken.split(".")[1]));
    }
    return null;
  }

  isAuthenticated(): boolean{
    let payload = this.obtenerDatosToken(this.token);
    if (payload != null && payload.user_name && payload.user_name.length>0)
      return true
    return false
  }

  logout(): void {
    this._token = null;
    this._persona = null;
    sessionStorage.clear();
  }

  // hasRole(role: Rol): boolean{
  hasRole(role: string): boolean{
    if (this.isAuthenticated()){
      if (this.persona.roles !=null){
        for(let i = 0; i < this.persona.roles.length; i++)
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
