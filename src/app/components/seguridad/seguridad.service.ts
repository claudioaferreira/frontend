import { inject, Injectable } from '@angular/core';
import { UserService } from '../../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class SeguridadService {

  private _userServices = inject(UserService);

  constructor() { }

  estaLogueado(): boolean {
    return true;
  }

  obtenerRol(): string {
    const rol = this._userServices.obtenerCampoJWT('rol');

    return rol;
  }

}
