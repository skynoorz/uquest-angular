import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {Encuesta} from "../classes/encuesta";
import {Observable} from "rxjs";
import {Respuesta} from "../classes/respuesta";

export interface IRespuesta  {
  textValue?: string;
  numValue?: number;
  opcionId?: number
  preguntaId?: number;
  usuarioId?: number;
}

@Injectable({
  providedIn: 'root'
})
export class RespuestasService {


  private baseUrl: string = "http://localhost:8080/api/respuesta";

  constructor(private http: HttpClient) {}

  saveAllRespuetas(respuestas: IRespuesta[]) {
    console.log("respuestasService: ",respuestas)
    return this.http.post(`${this.baseUrl}/all`, respuestas);
  }

  getRespuestasEncuesta(encuesta: Encuesta){
    return this.http.get(`${this.baseUrl}/encuesta/${encuesta.id}`);
  }

  getRespuestasByEncuestaId(id):Observable<Respuesta[]>{
    return this.http.get<Respuesta[]>(`${this.baseUrl}s/encuesta/${id}`);
  }

  getUsersWhoAnsweredEncuesta(id):Observable<number[]>{
    return this.http.get<number[]>(`${this.baseUrl}/usuarios/encuesta/${id}`);
  }

  getRespuestasByPreguntaId(idPregunta):Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/usuarios/pregunta/${idPregunta}`);
  }
}
