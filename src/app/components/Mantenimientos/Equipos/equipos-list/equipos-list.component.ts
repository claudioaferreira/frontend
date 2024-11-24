import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { IProduct } from '../../../../interfaces/product';
import { ProductService } from '../../../../services/product.service';
import Swal from 'sweetalert2';
import { AutorizadoComponent } from "../../../seguridad/autorizado/autorizado.component";
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormularioEquipoComponent } from '../formulario-equipo/formulario-equipo.component';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-equipos-list',
  standalone: true,
  imports: [AutorizadoComponent, CommonModule, MatCardModule, MatTableModule, MatIconModule, MatButtonModule, MatPaginatorModule],
  templateUrl: './equipos-list.component.html',
  styleUrl: './equipos-list.component.css'
})
export class EquiposListComponent implements OnInit {

  private router = inject(Router);
  private _productService = inject(ProductService);
  productList: IProduct[] = [];

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this._productService.getProducts().subscribe((res: IProduct[]) => {
      this.productList = res;
      //console.log(res);
    });
  }
  nuevo(){
    this.router.navigate(['/mantenimiento/equipo-crear', 0]);

  }
  editarEquipo(equipoid: number) {
    this.router.navigate(['/mantenimiento/equipo-editar', equipoid]);
  }

  /* editarEquipo() {
    Swal.fire({
      title: 'Error?',
      text: "No tienes permisos para editar",
      icon: 'error',
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ok'
    });
  } */

  verDetalles() {
    Swal.fire({
      title: 'Error?',
      text: "No tienes permisos para ver detalles",
      icon: 'error',
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ok'
    });
  }

  getBadgeClass(estado: string): string {
    switch (estado) {
      case 'DISPONIBLE':
        return 'badge rounded-pill bg-success';
      case 'PARA PIEZA':
      case 'ESPERANDO PIEZA':
        return 'badge rounded-pill bg-danger';
      case 'NO IDENTIFICADO':
      case 'PENDIENTE CHEQUEO':
        return 'badge rounded-pill bg-secondary text-dark';
      case 'EN PROCESO':
        return 'badge rounded-pill bg-primary text-white';
      case 'INSTALADO':
        return 'badge rounded-pill bg-info';
      case 'DESCARGO':
      case 'CON PROBLEMA':
        return 'badge rounded-pill bg-danger';
      default:
        return 'badge rounded-pill bg-secondary text-dark'; // Default badge class
    }
  }

}
