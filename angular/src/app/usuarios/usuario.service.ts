import {Injectable} from '@angular/core';
import {Usuario} from "./usuario";
import {Observable, of, throwError} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, catchError} from "rxjs/operators";
import Swal from "sweetalert2";
import {Router} from "@angular/router"

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private urlEndpoint:string = "http://localhost:8080/api/usuarios"
  httpHeaders= new HttpHeaders({'Content-Type': 'application/json'})


  constructor(private http: HttpClient, private router: Router) {
  }

  getUsuarios(): Observable<Usuario[]> {
    // return of(USUARIOS);
    // return this.http.get<Usuario[]>(this.urlEndpoint);
    return this.http.get(this.urlEndpoint).pipe(
      map( response => response as Usuario[])
    )
  }

  create(usuario: Usuario): Observable<any>{
    return this.http.post<any>(this.urlEndpoint, usuario, { headers: this.httpHeaders}).pipe(
      catchError(err => {
        console.log(err.error.mensaje)
        Swal.fire({icon: 'error', title: err.error.mensaje, text: err.error.error})
        return throwError(err);
      })
    )
  }

  getUsuario(id): Observable<Usuario>{
    return this.http.get<Usuario>(`${this.urlEndpoint}/${id}`).pipe(
      catchError(err => {
        this.router.navigate(['/usuarios'])
        console.log(err.error.mensaje)
        Swal.fire({icon: 'error', title: 'Oops...', text: 'Error al editar', footer: err.error.mensaje})
        return throwError(err);
      })
    )
  }

  update(usuario: Usuario): Observable<any>{
    return this.http.put<any>(`${this.urlEndpoint}/${usuario.id}`, usuario, {headers: this.httpHeaders}).pipe(
      catchError(err => {
        console.log(err.error.mensaje)
        Swal.fire({icon: 'error', title: err.error.mensaje, text: err.error.error})
        return throwError(err);
      })
    )
  }

  delete(id: number): Observable<Usuario>{
    return this.http.delete<Usuario>(`${this.urlEndpoint}/${id}`,{headers: this.httpHeaders}).pipe(
      catchError(err => {
        console.log(err.error.mensaje)
        Swal.fire({icon: 'error', title: err.error.mensaje, text: err.error.error})
        return throwError(err);
      })
    )
  }
}
