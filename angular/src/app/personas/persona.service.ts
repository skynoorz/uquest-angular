import {Injectable} from '@angular/core';
import {Persona} from "./persona";
import {Observable, throwError} from "rxjs";
import {HttpClient, HttpEvent, HttpRequest} from "@angular/common/http";
import {map, catchError, tap} from "rxjs/operators";
import {Router} from "@angular/router"
import {Carrera} from "./carrera";
import {Instituto} from "./instituto";

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  private urlEndpoint: string = "http://localhost:8080/api/usuarios"
  // httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})
  // clase 153

  // private isNoAutorizado(e): boolean{
  //   if (e.status==401){
  //     if (this.authService.isAuthenticated())
  //       this.authService.logout()
  //     this.router.navigate(['/login'])
  //     return true;
  //   }
  //   if (e.status==403){
  //     Swal.fire("Acceso denegado","lo siento, no tienes acceso a este recurso", "warning")
  //     this.router.navigate(['/personas'])
  //     return true;
  //   }
  //   return false;
  // }

  constructor(private http: HttpClient, private router: Router) {
  }

  // private agregarAuthorizationHeader(){
  //   let token = this.authService.token;
  //   if (token != null)
  //   {
  //     // console.log("Mi token:"+ token);
  //     return this.httpHeaders.append('Authorization','Bearer '+token);
  //   }
  //   return this.httpHeaders;
  // }

  getCarreras(): Observable<Carrera[]> {
    return this.http.get<Carrera[]>(this.urlEndpoint + '/carreras');
  }

  getInstitutos(): Observable<Instituto[]> {
    return this.http.get<Instituto[]>(this.urlEndpoint + '/institutos');
  }

  getRoles(): Observable<string[]>{
    return this.http.get<string[]>(this.urlEndpoint+'/roles');
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
    return this.http.post<any>(this.urlEndpoint, persona).pipe(
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

  update(persona: Persona): Observable<any> {
    console.log(persona);
    return this.http.put<any>(`${this.urlEndpoint}/${persona.id}`, persona).pipe(

      catchError(err => {
        if (err.status == 400) {
          return throwError(err);
        }
        if (err.error.mensaje)
          console.log(err.error.mensaje)
        return throwError(err);
      })
    )
  }

  delete(id: number): Observable<Persona> {
    return this.http.delete<Persona>(`${this.urlEndpoint}/${id}`).pipe(
      catchError(err => {
        if (err.error.mensaje)
          console.log(err.error.mensaje)
        return throwError(err);
      })
    )
  }

  subirFoto(archivo: File, id): Observable<HttpEvent<any>> {
    let formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("id", id);

    const req = new HttpRequest('POST', `${this.urlEndpoint}/upload`, formData, {
      reportProgress: true
    })
    return this.http.request(req);
  }

  userExist(username: string): Observable<any>{
    console.log(username);
    // console.log(this.http.get(`${this.urlEndpoint}/userexist/${username}`))
    return this.http.get<any>(`${this.urlEndpoint}/userexist/${username}`);
  }
}
