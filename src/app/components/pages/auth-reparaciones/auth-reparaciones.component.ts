import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { CommonModule } from '@angular/common';

import Swal from 'sweetalert2';
import { SpinnerComponent } from '../../../shared/spinner/spinner.component';
import { ReparacionesService } from '../../../services/reparaciones.service';


@Component({
  selector: 'app-auth-reparaciones',
  standalone: true,
  imports: [NavbarComponent, CommonModule, SpinnerComponent],
  templateUrl: './auth-reparaciones.component.html',
  styleUrl: './auth-reparaciones.component.css'
})
export class AuthReparacionesComponent implements OnInit {
  autorizadosList: any[] = [];
  private _reparaciones = inject(ReparacionesService);
  constructor() { }
  loading: boolean = false;
  skeletonItems = Array(3).fill(0);

  ngOnInit(): void {
    setTimeout(() => {
      this.loading = false;
    }, 3000); // Simula una carga de 3 segundos
    this.loadNoAutorizados();

  }

  getBadgeClass(estado: string): string {
    switch (estado) {
      case 'DISPONIBLE':
        return 'badge bg-success fs-5 fw-bold';
      case 'PENDIENTE CHEQUEO':
        return 'badge bg-warning fs-5 fw-bold';
      case 'FUERA DE SERVICIO':
        return 'badge bg-danger fs-5 fw-bold';
        case 'DESCARGO':
          return 'badge bg-danger fs-5 fw-bold';
      default:
        return 'badge bg-secondary fs-5 fw-bold'; // Clase predeterminada
    }
  }

loadNoAutorizados(){
  this.loading = true;
    this._reparaciones.getCantidadNoReparados().subscribe((res: any) => {
      this.autorizadosList = res.body;
      this.loading = false;
    }, (error: any) => {
      console.log(error);
    })
  }

  autorizar(){
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "NO TIENES AUTORIZACION PARA REALIZAR ESTA ACCION",
      footer: '<a>Why do I have this issue?</a>'
    });
  }

}
