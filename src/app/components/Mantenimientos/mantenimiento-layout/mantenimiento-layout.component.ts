import { Component, inject } from '@angular/core';
import { MantenimientoOpcionesComponent } from "../mantenimiento-opciones/mantenimiento-opciones.component";
import { Router, RouterOutlet } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-mantenimiento-layout',
  standalone: true,
  imports: [MatCardModule, MatTableModule, MatIconModule, MatButtonModule, MatPaginatorModule, CommonModule, MantenimientoOpcionesComponent, RouterOutlet],
  templateUrl: './mantenimiento-layout.component.html',
  styleUrl: './mantenimiento-layout.component.css'
})
export class MantenimientoLayoutComponent {

  private route = inject(Router);

  volver(){
    this.route.navigate(['/mantenimiento/']);
  }
}
