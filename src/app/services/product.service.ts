import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { ICategoria, IMarca, IModelo, IProduct } from '../interfaces/product';
import { ILoginResponseToken } from '../interfaces/loginResponseToken';
import { IResponseJSON } from '../interfaces/responseJSON';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private myAppUrl: string;
  private myApiUrl:string;

private http: HttpClient = inject(HttpClient);
private _errorService = inject(ErrorService);

  constructor() {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/products/';
  }


  getProducts():Observable<IProduct[]>{
    //SE PUEDE USAR EL TOKEN DE ESTA MANERA O CON UN INTERCEPTOR
/*     const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<IProduct[]>(this.myAppUrl + this.myApiUrl, {headers: headers}); */
    return this.http.get<IProduct[]>(this.myAppUrl + this.myApiUrl);
  }


  getCategorias(): Observable<IResponseJSON> {
    return this.http.get<IResponseJSON>(`${this.myAppUrl}${this.myApiUrl}categorias`);
  }


  getMarcasByCategoria(categoriaId: number): Observable<IResponseJSON> {
    return this.http.post<IResponseJSON>(`${this.myAppUrl}${this.myApiUrl}marcaXcategoria/${categoriaId}`, {});
  }

  getModelosByMarca(marcaid: number): Observable<IResponseJSON> {
    return this.http.post<IResponseJSON>(`${this.myAppUrl}${this.myApiUrl}modeloXmarca/${marcaid}`, {});
  }

  getEquipoById(equipoid: number): Observable<IResponseJSON> {
    return this.http.post<IResponseJSON>(`${this.myAppUrl}${this.myApiUrl}/getEquipoId/${equipoid}`, {});
  }


  getEstados(): Observable<IResponseJSON> {
    return this.http.get<IResponseJSON>(`${this.myAppUrl}${this.myApiUrl}estadoEquipo`);
  }

  getLocalidad():Observable<IResponseJSON>{
    return this.http.get<IResponseJSON>(`${this.myAppUrl}${this.myApiUrl}localidadEquipo`);
  }

  verificarCodigoYSerial(codigo:string) : Observable<IResponseJSON>{
    return this.http.post<IResponseJSON>(`${this.myAppUrl}${this.myApiUrl}verificarCodigoYSerial/${codigo}`,{});
  }

}
