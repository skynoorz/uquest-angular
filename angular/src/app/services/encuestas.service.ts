import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable, throwError} from "rxjs";
import {Encuesta} from "../classes/encuesta";
import {catchError} from "rxjs/operators";
import {Categoria} from "../classes/categoria";
import {OpcionSend} from "../classes/opcion";
import {environment} from "../../environments/environment";
import {EncuestaUsuario} from "../classes/encuesta-usuario";
import {Carrera} from "../classes/carrera";

@Injectable({
  providedIn: 'root'
})
export class EncuestasService {

  private urlEndpoint: string = environment.basePath +"/api/usuarios"
  private urlEndpointNative: string = environment.basePath + "/api"

  ngOnInit(): void{

  }

  constructor(private http: HttpClient, private router: Router) {
  }

  getEncuestasTodas(): Observable<EncuestaUsuario[]>{
    return this.http.get<EncuestaUsuario[]>(`${this.urlEndpointNative}/encuestas`);
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

  getEncuestaUID(id): Observable<Encuesta>{
    // console.log("envio uid: ",id)
    return this.http.get<Encuesta>(`${this.urlEndpointNative}/encuestas/uid/${id}`)
  }

  getEncuestasByUsername(user): Observable<Encuesta[]>{
    return this.http.get<Encuesta[]>(`${this.urlEndpoint}/encuestas/user/${user}`);
  }

  save(encuesta: Encuesta): Observable<any>{
    return this.http.post<any>(environment.basePath +"/api/encuestas", encuesta).pipe(
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
    return this.http.get<Categoria[]>(environment.basePath + `/api/categorias`);
  }

  getAllPublicEncuestas():Observable<Encuesta[]>{
    return this.http.get<Encuesta[]>(`${this.urlEndpointNative}/encuestas/public`);
  }

  getTotalRespuestasByEncuestaId(id):Observable<any>{
    return this.http.get<Encuesta[]>(`${this.urlEndpointNative}/respuestas-total/encuesta/${id}`);
  }

  delete(encuestaId: number):Observable<any>{
    return this.http.delete<Encuesta[]>(`${this.urlEndpointNative}/encuesta/${encuestaId}`);
  }

  getEncuestasAvailable(): Observable<any>{
    return this.http.get<number[]>(`${this.urlEndpointNative}/encuestas/available`);
  }

  finalizarEncuesta(encuestaId): Observable<any> {
    return this.http.get<any>(`${this.urlEndpointNative}/encuestas/finalizar/${encuestaId}`);
  }

  getEncuestasByCarreraIdAbierto(carreraId: number): Observable<Encuesta[]>{
    return this.http.get<Encuesta[]>(`${this.urlEndpointNative}/encuestas/carrera/${carreraId}`)
  }


}
