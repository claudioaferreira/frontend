import { Component, inject, Input } from '@angular/core';
import { SeguridadService } from '../seguridad.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-autorizado',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './autorizado.component.html',
  styleUrl: './autorizado.component.css'
})
export class AutorizadoComponent {
@Input()
rol?:string;

  private _seguridadService = inject(SeguridadService);

  estautorizado(): boolean {
    if(this.rol){
      return this._seguridadService.obtenerRol() === this.rol;
    } else {
      return this._seguridadService.estaLogueado();
    }
  }
}
