import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

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
    return this.http.post(`${this.baseUrl}/all`, respuestas);
  }

}
