import { Component, inject, OnInit } from '@angular/core';
import { AutorizadoComponent } from "../../seguridad/autorizado/autorizado.component";
import { UserService } from '../../../services/user.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [AutorizadoComponent, RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  private _userServices = inject(UserService);
  public username: string = '';
  public id?: number;
  public rol: string = '';

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.obtenerDatosUsuario();
  }


  obtenerDatosUsuario(){
    this.username = this._userServices.obtenerCampoJWT('username');
    this.id = parseInt(this._userServices.obtenerCampoJWT('id'));
    this.rol = this._userServices.obtenerCampoJWT('rol');
  }
}
