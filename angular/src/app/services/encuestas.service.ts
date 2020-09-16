import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable, throwError} from "rxjs";
import {Encuesta} from "../personas/encuesta";
import {catchError} from "rxjs/operators";
import {Categoria} from "../personas/categoria";
import {Persona} from "../personas/persona";
import {Opcion, OpcionSend} from "../personas/opcion";

@Injectable({
  providedIn: 'root'
})
export class EncuestasService {

  private urlEndpoint: string = "http://localhost:8080/api/usuarios"
  private urlEndpointNative: string = "http://localhost:8080/api"

  ngOnInit(): void{

  }

  constructor(private http: HttpClient, private router: Router) {
  }

  getEncuestas(id): Observable<Encuesta[]>{
    return this.http.get<Encuesta[]>(`${this.urlEndpoint}/encuestas/${id}`);
  }

  saveOption(opcion: OpcionSend): Observable<OpcionSend>{
    return this.http.post<any>(`${this.urlEndpointNative}/opciones`, opcion).pipe(
      catchError(err => {
        if (err.status == 400 ) {
          return throwError(err);
        }
        if (err.error.mensaje)
          console.log(err.error.mensaje)
        return throwError(err);
      })
    )
  }
  saveOptions(opcion: OpcionSend[]): Observable<OpcionSend[]>{
    return this.http.post<any>(`${this.urlEndpointNative}/opciones`, opcion).pipe(
      catchError(err => {
        if (err.status == 400 ) {
          return throwError(err);
        }
        if (err.error.mensaje)
          console.log(err.error.mensaje)
        return throwError(err);
      })
    )
  }

  getIdsFromText(text: string): Observable<any>{
    return this.http.get<any>(`${this.urlEndpointNative}/opciones/${text}`)
  }

  getEncuesta(id): Observable<Encuesta>{
    return this.http.get<Encuesta>(`${this.urlEndpointNative}/encuestas/${id}`)
  }

  getEncuestasByUsername(user): Observable<Encuesta[]>{
    return this.http.get<Encuesta[]>(`${this.urlEndpoint}/encuestas/user/${user}`);
  }

  // save(encuesta) :Observable<Encuesta>{
  //   return this.http.post<Encuesta>(`http://localhost:8080/api/encuestas/${encuesta}`);
  // }

  save(encuesta: Encuesta): Observable<any>{
    console.log("entra al save")
    console.log(encuesta)
    console.log(JSON.stringify(encuesta))

    return this.http.post<any>("http://localhost:8080/api/encuestas", encuesta).pipe(
      catchError(err => {
        if (err.status == 400 ) {
          return throwError(err);
        }
        if (err.error.mensaje)
          console.log(err.error.mensaje)
        return throwError(err);
      })
    )
  }

  getAllCategorias(): Observable<Categoria[]>{
    return this.http.get<Categoria[]>(`http://localhost:8080/api/categorias`);
  }

  getAllPublicEncuestas():Observable<Encuesta[]>{
    return this.http.get<Encuesta[]>(`${this.urlEndpointNative}/encuestas/public`);
  }
}
