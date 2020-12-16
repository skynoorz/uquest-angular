import {Injectable} from '@angular/core';
import {Persona} from "../classes/persona";
import {Observable, throwError} from "rxjs";
import {HttpClient, HttpEvent, HttpRequest} from "@angular/common/http";
import {map, catchError, tap} from "rxjs/operators";
import {Router} from "@angular/router"
import {Carrera} from "../classes/carrera";
import {Instituto} from "../classes/instituto";

@Injectable({
  providedIn: 'root'
})
export class CarreraService {

  private urlEndpoint: string = "http://localhost:8080/api/carreras"

  public institutos: Instituto[];

  constructor(private http: HttpClient, private router: Router) {
  }

  getCarreras(): Observable<Carrera[]> {
    return this.http.get<Carrera[]>(this.urlEndpoint);
  }

  getInstitutos(): Observable<Instituto[]> {
    return this.http.get<Instituto[]>(this.urlEndpoint + '/institutos');
  }

  getPersona(id): Observable<Persona> {
    console.log("respuesta en service: "+this.http.get(`${this.urlEndpoint}/${id}`));
    return this.http.get<Persona>(`${this.urlEndpoint}/${id}`).pipe(
      catchError(err => {
        if (err.status != 401 && err.error.mensaje){
          this.router.navigate(['/personas'])
          console.log(err.error.mensaje)
        }
        return throwError(err);
      })
    )
  }
  getInstitutosByCarreraId(id): Observable<Instituto[]>{
    // console.log("llama al service: ")
    return this.http.get<Instituto[]>(`${this.urlEndpoint}/institutos/${id}`).pipe(
      catchError(err => {
        if (err.status != 401 && err.error.mensaje){
          this.router.navigate(['/registro'])
          console.log(err.error.mensaje)
        }
        return throwError(err);
      })
    );
  }

}
