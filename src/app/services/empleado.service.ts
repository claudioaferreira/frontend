import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { ITestEmpleado } from '../interfaces/testEmpleado';
import { IResponseAPINET } from '../interfaces/responseJSON';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  myAppUrl: string;
  private myApiUrl: string;

  private http = inject(HttpClient);

  constructor() {
    this.myAppUrl = environment.endpointNET;
    this.myApiUrl = 'api/Empleado';
  }

  listarEmpleado(): Observable<ITestEmpleado[]> {
    /* console.log(`URL de la API: ${this.myAppUrl}${this.myApiUrl}`); */
    return this.http.get<IResponseAPINET>(`${this.myAppUrl}${this.myApiUrl}`).pipe(
      map(response => response.data as ITestEmpleado[])
    );
  }

  obtenerEmpleado(id: number): Observable<ITestEmpleado> {
    return this.http.get<ITestEmpleado>(`${this.myAppUrl}${this.myApiUrl}/${id}`)
    /* .pipe(map(response => response as ITestEmpleado)
    ); */
  }

  crearEmpleado(obj: ITestEmpleado): Observable<IResponseAPINET> {
    return this.http.post<IResponseAPINET>(`${this.myAppUrl}${this.myApiUrl}`, obj);
  }

  editarEmpleado(obj: ITestEmpleado) {
    return this.http.put<IResponseAPINET>(`${this.myAppUrl}${this.myApiUrl}`, obj);
  }

  eliminarEmpleado(id: number): Observable<IResponseAPINET> {
    return this.http.delete<IResponseAPINET>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }
}
