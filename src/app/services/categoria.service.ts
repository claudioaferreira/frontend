import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { IResponseJSON } from '../interfaces/responseJSON';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  myAppUrl: string;
  private myApiUrl: string;
  private http: HttpClient = inject(HttpClient);

  constructor() {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/categorias/';
  }


  getCategorias(): Observable<IResponseJSON> {
    return this.http.get<IResponseJSON>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  getCategoriaID(id: number): Observable<IResponseJSON> {
    return this.http.get<IResponseJSON>(`${this.myAppUrl}${this.myApiUrl}id/${id}`);
  }

  getEstados(): Observable<IResponseJSON> {
    return this.http.get<IResponseJSON>(`${this.myAppUrl}${this.myApiUrl}estadoEquipo`);
  }

}
