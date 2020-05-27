import {Injectable} from '@angular/core';
import {Usuario} from "./usuario";
import {Observable, of, throwError} from "rxjs";
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from "@angular/common/http";
import {map, catchError, tap} from "rxjs/operators";
import Swal from "sweetalert2";
import {Router} from "@angular/router"
import {DatePipe} from "@angular/common";
import {Carrera} from "./carrera";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private urlEndpoint: string = "http://localhost:8080/api/usuarios"
  httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})


  constructor(private http: HttpClient, private router: Router) {
  }

  getCarreras(): Observable<Carrera[]>{
    return this.http.get<Carrera[]>(this.urlEndpoint+'/carreras');
  }

  getUsuarios(page: number): Observable<any> {
    return this.http.get(this.urlEndpoint + '/page/' + page).pipe(
      tap((response: any) => {
        console.log('usuario service: tap 1');
        (response.content as Usuario[]).forEach(usuario => {
          console.log(usuario.nombres)
        });
      }),
      map((response: any) => {
        // formato personalizado de fecha y demas datos
        (response.content as Usuario[]).map(usuario => {
          // nombres
          // usuario.nombres = usuario.nombres.toUpperCase();
          // fecha nacimiento
          // let datePipe = new DatePipe('es')
          // usuario.fnac = datePipe.transform(usuario.fnac, 'EEEE dd, MMMM, yyyy')
          return usuario;
        });
        return response;
      }),
      tap(
        response => {
          console.log('usuario service: tap 2');
          (response.content as Usuario[]).forEach(usuario => {
            console.log(usuario.nombres)
          });
        })
    )
  }

  create(usuario: Usuario): Observable<any> {
    return this.http.post<any>(this.urlEndpoint, usuario, {headers: this.httpHeaders}).pipe(
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

  getUsuario(id): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.urlEndpoint}/${id}`).pipe(
      catchError(err => {
        this.router.navigate(['/usuarios'])
        console.log(err.error.mensaje)
        Swal.fire({icon: 'error', title: 'Oops...', text: 'Error al editar', footer: err.error.mensaje})
        return throwError(err);
      })
    )
  }

  update(usuario: Usuario): Observable<any> {
    return this.http.put<any>(`${this.urlEndpoint}/${usuario.id}`, usuario, {headers: this.httpHeaders}).pipe(
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

  delete(id: number): Observable<Usuario> {
    return this.http.delete<Usuario>(`${this.urlEndpoint}/${id}`, {headers: this.httpHeaders}).pipe(
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
