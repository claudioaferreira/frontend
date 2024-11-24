import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../interfaces/user';
import { Observable } from 'rxjs';
import { ILoginResponseToken } from '../interfaces/loginResponseToken';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private myAppUrl: string;
  private myApiUrl:string;

private http: HttpClient = inject(HttpClient);

  constructor() {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/user/';
  }


  signIn(user : IUser):Observable<any>{
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}newuser`, user);
  }


  login(user : IUser):Observable<ILoginResponseToken>{
    return this.http.post<ILoginResponseToken>(`${this.myAppUrl}${this.myApiUrl}login`, user);
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiration');
  }

  estaLogueado(): boolean {
    const token = localStorage.getItem('token');

    if(!token){
      return false;
    }
    const expiracion = localStorage.getItem('tokenExpiration')!;
    const expiracionDate = new Date(expiracion);

    if(expiracionDate <= new Date()){
      this.logout();
      return false;
    }
    return true;
  }

  obtenerCampoJWT (campo: string): string {
    const token = localStorage.getItem('token');
    if(!token){
      return '';
    }
    //obtener el campo del token:payload:data
    const dataToken = JSON.parse(atob(token.split('.')[1]));
    return dataToken[campo];
  }

  obtenerUsuarios():Observable<IUser[]>{
    return this.http.get<IUser[]>(`${this.myAppUrl}${this.myApiUrl}getAllUsers`);
  }

  obtenerUsuarioById(id: number):Observable<IUser>{
    return this.http.get<IUser>(`${this.myAppUrl}${this.myApiUrl}getUser/${id}`);
  }

}
