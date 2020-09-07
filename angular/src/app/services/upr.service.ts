import {Injectable} from '@angular/core';
import {Observable, throwError} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Upr} from "../classes/upr";
import {catchError} from "rxjs/operators";
import {UprSend} from "../classes/uprSend";

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

  sendRespuestas(upr: UprSend): Observable<any> {
    console.log("enviamos post: ")
    console.log(upr);
    return this.http.post<any>(`${this.urlEndpoint}/`, upr).pipe(
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
