import { Component, inject, OnInit } from '@angular/core';
import { SeguridadService } from '../../seguridad/seguridad.service';
import { CommonModule } from '@angular/common';
import { ReparacionesService } from '../../../services/reparaciones.service';

@Component({
  selector: 'app-card-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.css']
})
export class CardDetailsComponent implements OnInit {
  private _reparaciones = inject(ReparacionesService);
  private _seguridadService = inject(SeguridadService);
  public rol: string = '';
  public mostrarNoAutorizados: boolean = false;
  public mostrarBudget: boolean = false;
  public mostrarNewProjects: boolean = false;
  public mostrarTotalHours: boolean = false;
  cantidadNoAutorizados: number = 0;


  ngOnInit(): void {
    this.obtenerRolUsuario();
    this.configurarVisibilidadTarjetas();
  }

  obtenerRolUsuario() {
    this.rol = this._seguridadService.obtenerRol();
    this.getCantidadNoReparados();

  }

  configurarVisibilidadTarjetas() {
    if (this.rol === 'admin') {
      this.mostrarNoAutorizados = true;
      this.mostrarBudget = true;
      this.mostrarNewProjects = true;
      this.mostrarTotalHours = true;
    } else if (this.rol === 'tecnico') {
      this.mostrarNoAutorizados = true;
      this.mostrarTotalHours = true;
    } else if (this.rol === 'supervisor') {
      this.mostrarBudget = true;
      this.mostrarNewProjects = true;
    }
  }


  getCantidadNoReparados() {
    this._reparaciones.getCantidadNoReparados().subscribe((res: any) => {
      if (!res.error) {
        this.cantidadNoAutorizados = res.body.length;
        //console.log(this.cantidadNoAutorizados);

      }

    }
    );
  }
}
