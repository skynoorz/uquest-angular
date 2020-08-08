import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {Encuesta} from "../personas/encuesta";

@Injectable({
  providedIn: 'root'
})
export class EncuestasService {

  private urlEndpoint: string = "http://localhost:8080/api/usuarios"

  constructor(private http: HttpClient, private router: Router) {
  }

  getEncuestas(): Observable<Encuesta[]>{
    return this.http.get<Encuesta[]>(`${this.urlEndpoint}/encuestas`)
  }
}
