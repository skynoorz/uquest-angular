import { Injectable } from '@angular/core';
import {Instituto} from "../classes/instituto";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Carrera} from "../classes/carrera";

@Injectable({
  providedIn: 'root'
})
export class InstitutoService {

  private urlEndpoint: string = environment.basePath + "/api/institutos";

  constructor(private http: HttpClient, private router: Router) { }

  save(instituto: Instituto) : Observable<Instituto> {
    console.log("envio desde service: ", instituto)
    return this.http.post<Instituto>(`${this.urlEndpoint}`,instituto).pipe(
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

  delete(id: number): Observable<any>{
    return this.http.delete<Carrera>(`${this.urlEndpoint}/delete/${id}`);
  }

  getInstitutoById(id: number): Observable<Instituto> {
      return this.http.get<Instituto>(`${this.urlEndpoint}/id/${id}`);
  }
}
