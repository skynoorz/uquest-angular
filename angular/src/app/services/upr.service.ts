import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Upr} from "../classes/upr";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UprService {

  private urlEndpoint: string = "http://localhost:8080/api/upr"

  constructor(private http: HttpClient) { }

  getUPR(id): Observable<Upr[]>{
    return this.http.get<Upr[]>(`${this.urlEndpoint}/${id}`);
  }

  getAllUpr(): Observable<Upr[]>{
    return this.http.get<Upr[]>(`${this.urlEndpoint}`);
  }
}
