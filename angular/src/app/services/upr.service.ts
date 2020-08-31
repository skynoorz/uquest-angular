import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UprService {

  private urlEndpoint: string = "http://localhost:8080/api/upr"

  constructor(private http: HttpClient) { }

  getTotalUPR(id): Observable<any>{
    return this.http.get<any>(`${this.urlEndpoint}/total/${id}`);
  }
}
