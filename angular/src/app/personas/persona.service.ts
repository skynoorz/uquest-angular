import {Injectable} from '@angular/core';
import {Persona} from "./persona";
import {Observable, of, throwError} from "rxjs";
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from "@angular/common/http";
import {map, catchError, tap} from "rxjs/operators";
import Swal from "sweetalert2";
import {Router} from "@angular/router"
import {DatePipe} from "@angular/common";
import {Carrera} from "./carrera";
import {Instituto} from "./instituto";

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  private urlEndpoint: string = "http://localhost:8080/api/personas"
  httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})


  constructor(private http: HttpClient, private router: Router) {
  }

  getCarreras(): Observable<Carrera[]>{
    return this.http.get<Carrera[]>(this.urlEndpoint+'/carreras');
  }
  getInstitutos(): Observable<Instituto[]>{
    return this.http.get<Instituto[]>(this.urlEndpoint+'/institutos');
  }

  getPersonas(page: number): Observable<any> {
    return this.http.get(this.urlEndpoint + '/page/' + page).pipe(
      tap((response: any) => {
        console.log('persona service: tap 1');
        (response.content as Persona[]).forEach(persona => {
          console.log(persona.nombres)
        });
      }),
      map((response: any) => {
        // formato personalizado de fecha y demas datos
        (response.content as Persona[]).map(persona => {
          // nombres
          // persona.nombres = persona.nombres.toUpperCase();
          // fecha nacimiento
          // let datePipe = new DatePipe('es')
          // persona.fnac = datePipe.transform(persona.fnac, 'EEEE dd, MMMM, yyyy')
          return persona;
        });
        return response;
      }),
      tap(
        response => {
          console.log('persona service: tap 2');
          (response.content as Persona[]).forEach(persona => {
            console.log(persona.nombres)
          });
        })
    )
  }

  create(persona: Persona): Observable<any> {
    return this.http.post<any>(this.urlEndpoint, persona, {headers: this.httpHeaders}).pipe(
      catchError(err => {
        if (err.status == 400) {
          return throwError(err);
        }
        console.log(err.error.mensaje)
        Swal.fire({icon: 'error', title: err.error.mensaje, text: err.error.error})
        return throwError(err);
      })
    )
  }

  getPersona(id): Observable<Persona> {
    return this.http.get<Persona>(`${this.urlEndpoint}/${id}`).pipe(
      catchError(err => {
        this.router.navigate(['/personas'])
        console.log(err.error.mensaje)
        Swal.fire({icon: 'error', title: 'Oops...', text: 'Error al editar', footer: err.error.mensaje})
        return throwError(err);
      })
    )
  }

  update(persona: Persona): Observable<any> {
    return this.http.put<any>(`${this.urlEndpoint}/${persona.id}`, persona, {headers: this.httpHeaders}).pipe(
      catchError(err => {
        if (err.status == 400) {
          return throwError(err);
        }
        console.log(err.error.mensaje)
        Swal.fire({icon: 'error', title: err.error.mensaje, text: err.error.error})
        return throwError(err);
      })
    )
  }

  delete(id: number): Observable<Persona> {
    return this.http.delete<Persona>(`${this.urlEndpoint}/${id}`, {headers: this.httpHeaders}).pipe(
      catchError(err => {
        console.log(err.error.mensaje)
        Swal.fire({icon: 'error', title: err.error.mensaje, text: err.error.error})
        return throwError(err);
      })
    )
  }

  subirFoto(archivo: File, id): Observable<HttpEvent<any>> {
    let formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("id", id);
    const req = new HttpRequest('POST', `${this.urlEndpoint}/upload`, formData,{
      reportProgress: true
    })
    return this.http.request(req);
  }
}
