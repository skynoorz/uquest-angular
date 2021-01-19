import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable, throwError} from "rxjs";
import {Categoria} from "../classes/categoria";
import {Encuesta} from "../classes/encuesta";
import {environment} from "../../environments/environment";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private urlEndpoint: string = environment.basePath +"/api/categorias"

  constructor(private http: HttpClient, private router: Router) { }

  getCategorias(): Observable<Categoria[]>{
    return this.http.get<Categoria[]>(`${this.urlEndpoint}`);
  }

  delete(id: number): Observable<any>{
    return this.http.delete<Categoria[]>(`${this.urlEndpoint}/delete/${id}`);
  }

  save(categoria: Categoria): Observable<any>{
    return this.http.post<any>(`${this.urlEndpoint}`, categoria).pipe(
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
}
