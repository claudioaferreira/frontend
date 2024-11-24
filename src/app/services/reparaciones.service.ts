import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReparacionesService {
  private myAppUrl: string;
  private myApiUrl:string;

  private http = inject(HttpClient);

  constructor() {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/reparaciones/';
   }

  getCantidadNoReparados():Observable<any> {
    return this.http.get<any>(this.myAppUrl + this.myApiUrl)
  }
}
