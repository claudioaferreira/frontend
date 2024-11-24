import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { EmpleadoService } from '../../../../services/empleado.service';
import { ITestEmpleado } from '../../../../interfaces/testEmpleado';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-empleado-master',
  standalone: true,
  imports: [MatCardModule, MatTableModule, MatIconModule, MatButtonModule, MatPaginatorModule, CommonModule],
  templateUrl: './empleado-master.component.html',
  styleUrls: ['./empleado-master.component.css']
})
export class EmpleadoMasterComponent implements OnInit, AfterViewInit {

  private _empleadoService = inject(EmpleadoService);
  private route = inject(Router);

  public listEmpleados: ITestEmpleado[] = [];
  public displayedColumns: string[] = ['nombreCompleto', 'correo', 'sueldo', 'fechaContrato', 'actions'];
  dataSource = new MatTableDataSource<ITestEmpleado>(this.listEmpleados);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor() {
    /* console.log('Constructor ejecutado'); */

  }
  ngOnInit() {
    this.obtenerEmpleados();
    this.consola();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  obtenerEmpleados() {
    /* console.log('Método obtenerEmpleados ejecutado'); */
    this._empleadoService.listarEmpleado().subscribe({
      next: (data) => {
        //console.log('Datos recibidos:', data);
        if (data.length > 0) {
          /* console.log('Datos válidos:', data); */
          this.listEmpleados = data;
          this.dataSource.data = this.listEmpleados;
        } else {
          console.log('No se recibieron datos');
        }
      },
      error: (error) => {
        console.log('Error al obtener empleados:', error);
      }
    });
  }

  consola() {
    /* console.log('Hola mundo desde lista empleados'); */
  }

  nuevo() {
    console.log('Método nuevo ejecutado');
    this.route.navigate(['/mantenimiento/empleado-crear', 0]);
  }

  editar(obj: ITestEmpleado) {
    this.route.navigate(['/mantenimiento/empleado-crear', obj.idEmpleado]);
  }

  eliminar(obj: ITestEmpleado) {
    /* console.log('Método eliminar ejecutado', obj); */
    if (confirm('¿Está seguro de eliminar el registro?' + obj.nombreCompleto)) {
      this._empleadoService.eliminarEmpleado(obj.idEmpleado).subscribe({
        next: (data) => {
          if (data.isSuccess) {
            this.obtenerEmpleados();
          } else {
            alert('No se pudo eliminar el registro');
          }
        },
        error: (error) => {
          console.log('Error al eliminar empleado:', error);
        }
      });
    }
  }
}
