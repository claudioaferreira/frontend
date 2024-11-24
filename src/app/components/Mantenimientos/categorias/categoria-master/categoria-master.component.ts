import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CategoriaService } from '../../../../services/categoria.service';
import { ICategoria } from '../../../../interfaces/product';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categoria-master',
  standalone: true,
  imports: [MatCardModule, MatTableModule, MatIconModule, MatButtonModule, MatPaginatorModule, CommonModule],
  templateUrl: './categoria-master.component.html',
  styleUrl: './categoria-master.component.css'
})
export class CategoriaMasterComponent implements OnInit, AfterViewInit {

  private route = inject(Router);
  public listCategorias: ICategoria[] = [];
  public displayedColumns: string[] = ['categoriaId', 'descripcion', 'estado', 'actions'];
  private _categoriaService = inject(CategoriaService);
  dataSource = new MatTableDataSource<ICategoria>(this.listCategorias);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  //Desde que cargue
  ngOnInit(): void {
this.obtenerCategorias();
  }

  //Despues de que cargue
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  obtenerCategorias() {
    this._categoriaService.getCategorias().subscribe({
      next: (data) => {
        console.log(data);
        if (!data.error) {
          this.listCategorias = data.body;
          this.dataSource.data = this.listCategorias;
        } else {
          console.log('No se recibieron datos');
        }
      },
      error: (error) => {
        console.log('Error al obtener categorias:', error);
      }
    });
  }

  nuevo(){
      this.route.navigate(['/mantenimiento/categorias-crear', 0]);
    }

  eliminar(obj: any){
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

  editar(obj: ICategoria){
    this.route.navigate(['/mantenimiento/categorias-crear', obj.categoriaId]);
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
