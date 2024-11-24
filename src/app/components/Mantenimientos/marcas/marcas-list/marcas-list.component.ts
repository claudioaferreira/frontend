import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IMarca } from '../../../../interfaces/product';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MarcaService } from '../../../../services/marca.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-marcas-list',
  standalone: true,
  imports: [MatCardModule, MatTableModule, MatIconModule, MatButtonModule, MatPaginatorModule, CommonModule],
  templateUrl: './marcas-list.component.html',
  styleUrl: './marcas-list.component.css'
})
export class MarcasListComponent implements OnInit, AfterViewInit {

  private route = inject(Router);
  public listMarcas: IMarca[] = [];
  private _marcaService = inject(MarcaService);
  public displayedColumns: string[] = ['marcaId', 'descripcion', 'categoria', 'estado', 'actions'];
  dataSource = new MatTableDataSource<IMarca>(this.listMarcas);


  constructor() { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.obtenerMarcas();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  obtenerMarcas() {
    this._marcaService.getMarcas().subscribe({
      next: (data) => {
        //console.log(data);
        if (!data.error) {
          this.listMarcas = data.body;
          this.dataSource.data = this.listMarcas;
        } else {
          console.log('No se recibieron datos');
        }
      },
      error: (error) => {
        console.log('Error al obtener marcas:', error);
      }
    });

  }

  nuevo() {
    this.route.navigate(['/mantenimiento/marcas-crear', 0]);
  }

  eliminar(obj: any) {
    Swal.fire({
      title: '¿Está seguro de eliminar la categoría?',
      showCancelButton: true,
      confirmButtonText: `Eliminar`,
    }).then((result) => {
      if (result.isConfirmed) {
        /*  this._categoriaService.eliminarCategoria(obj.categoriaId).subscribe({
           next: (data) => {
             if (!data.error) {
               Swal.fire('Categoría eliminada con éxito', '', 'success');
               this.obtenerCategorias();
             } else {
               console.log('No se recibieron datos');
             }
           },
           error: (error) => {
             console.log('Error al obtener categorias:', error);
           }
         }); */
      }
    });
  }

  editar(obj: IMarca) {
    this.route.navigate(['/mantenimiento/marcas-crear', 0]);
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
