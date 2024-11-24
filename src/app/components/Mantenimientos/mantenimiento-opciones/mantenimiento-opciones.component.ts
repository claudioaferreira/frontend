import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-mantenimiento-opciones',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './mantenimiento-opciones.component.html',
  styleUrl: './mantenimiento-opciones.component.css'
})
export class MantenimientoOpcionesComponent {

private route = inject(Router)
loading = true;
nuevoEmpleado() {
    //console.log('Método nuevo ejecutado');
    this.route.navigate(['/mantenimiento/empleado-crear', 0]);
  }

  nuevoCategoria() {
    //console.log('Método nuevo ejecutado');
    this.route.navigate(['/mantenimiento/categorias-crear', 0]);
  }

  nuevoEquipo() {
    //console.log('Método nuevo ejecutado');
    this.route.navigate(['/mantenimiento/equipo-crear', 0]);
  }

  ngOnInit() {
    // Simula la carga de datos
    setTimeout(() => {
      this.loading = false;
    }, 300); // Simula una carga de 0.5 segundos
    this.configurarVisibilidadTarjetas();
  }


  configurarVisibilidadTarjetas(){

  }

}
