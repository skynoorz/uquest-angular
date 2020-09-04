import {Injectable} from '@angular/core';
import {Observable, throwError} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Upr} from "../classes/upr";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UprService {

  private urlEndpoint: string = "http://localhost:8080/api/upr"

  constructor(private http: HttpClient) {
  }

  getTotalUPR(id): Observable<any> {
    return this.http.get<any>(`${this.urlEndpoint}/total/${id}`);
  }

  sendRespuestas(upr: Upr[]): Observable<any> {
    console.log(upr);
    return this.http.post<any>(`${this.urlEndpoint}/solve`, upr).pipe(
      catchError(err => {
        if (err.status == 400) {
          return throwError(err);
        }
        if (err.error.mensaje)
          console.log(err.error.mensaje)
        return throwError(err);
      })
    );
  }
}
