import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { IResponseJSON } from '../interfaces/responseJSON';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {
  myAppUrl: string;
  private myApiUrl: string;
  private http: HttpClient = inject(HttpClient);

  constructor() {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/marcas/';
  }

  getMarcas(): Observable<IResponseJSON> {
    return this.http.get<IResponseJSON>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  getMarcaID(id: number): Observable<IResponseJSON> {
    return this.http.get<IResponseJSON>(`${this.myAppUrl}${this.myApiUrl}id/${id}`);
  }

  getEstados(): Observable<IResponseJSON> {
    return this.http.get<IResponseJSON>(`${this.myAppUrl}${this.myApiUrl}estadoEquipo`);
  }
}
