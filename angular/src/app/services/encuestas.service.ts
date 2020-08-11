import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable, throwError} from "rxjs";
import {Encuesta} from "../personas/encuesta";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class EncuestasService {

  private urlEndpoint: string = "http://localhost:8080/api/usuarios"

  ngOnInit(): void{
    // this.http.get<Encuesta[]>(`${this.urlEndpoint}/encuestas/${id}`).subscribe(encuestas=>{this.encuestas = encuestas;});
  }

  constructor(private http: HttpClient, private router: Router) {
  }

  getEncuestas(id): Observable<Encuesta[]>{
    return this.http.get<Encuesta[]>(`${this.urlEndpoint}/encuestas/${id}`);
  }

  getEncuestasByUsername(user): Observable<Encuesta[]>{
    return this.http.get<Encuesta[]>(`${this.urlEndpoint}/encuestas/user/${user}`);
  }
}
