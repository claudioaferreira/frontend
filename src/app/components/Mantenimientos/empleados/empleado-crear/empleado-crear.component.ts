import { Component, inject, Input, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmpleadoService } from '../../../../services/empleado.service';
import { Router } from '@angular/router';
import { ITestEmpleado } from '../../../../interfaces/testEmpleado';
import { HttpClient } from '@angular/common/http';
import {MatCardModule} from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';

@Component({
  selector: 'app-empleado-crear',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatDatepickerModule,MatInputModule, MatFormFieldModule, MatButtonModule, FormsModule, ReactiveFormsModule, MatCardModule],
  templateUrl: './empleado-crear.component.html',
  styleUrl: './empleado-crear.component.css'
})
export class EmpleadoCrearComponent implements OnInit {

  //Para recibir un parametro desde otro componente
  @Input('id') idEmpleado!: number;
  private _empleadoService = inject(EmpleadoService);


  private route = inject(Router);
  private http = inject(HttpClient);
  //Para crear un formulario
  public formBuild = inject(FormBuilder);

  //Para crear un formulario
  public formEmpleado: FormGroup = this.formBuild.group({
    nombreCompleto: [''],
    correo: [''],
    sueldo: [0],
    fechaContrato: ['']
  })


  ngOnInit(): void {
    //Si el idEmpleado es diferente de 0 - obtener empleado desde base de datos
/*     console.log('Desde editar: idempleado' + this.idEmpleado) */
    if (this.idEmpleado != 0) {
      this._empleadoService.obtenerEmpleado(this.idEmpleado).subscribe({
        next: (data) => {

          this.formEmpleado.patchValue({
            nombreCompleto: data.nombreCompleto,
            correo: data.correo,
            sueldo: data.sueldo,
            fechaContrato: new Date(data.fechaContrato)
          })
        },
        error: (error) => {
          console.log('Error al obtener empleado:', error);
        }
      });
    }
  }

  guardarEmpleado() {
    //creamos un objecto con los datos del empleado del tipo Empleado
    const obj: ITestEmpleado = {
      idEmpleado: this.idEmpleado,
      nombreCompleto: this.formEmpleado.value.nombreCompleto,
      correo: this.formEmpleado.value.correo,
      sueldo: this.formEmpleado.value.sueldo,
      fechaContrato: this.formEmpleado.value.fechaContrato,
    }

    //si el id es 0 - crear empleado
    if (this.idEmpleado == 0) {
      this._empleadoService.crearEmpleado(obj).subscribe({
        next: (data) => {
          if (data.isSuccess) {
            this.route.navigate(['/mantenimiento/empleado-master']);
          } else {
            alert('Error al crear empleado');
          }
        },
        error: (error) => {
          console.log('Error al obtener empleado:', error);
        }
      });


      //De lo contrario editar empleado
    } else{
      this._empleadoService.editarEmpleado(obj).subscribe({
        next: (data) => {
          if (data.isSuccess) {
            this.route.navigate(['/mantenimiento/empleado-master']);
          } else {
            alert('Error al editar empleado');
          }
        },
        error: (error) => {
          console.log('Error al editar empleado:', error);
        }
      });
    }
  }

  volver(){
    this.route.navigate(['/mantenimiento/empleado-master']);
  }

  enviarFormCarry(){
    /* if (this.formEmpleado.valid) {
      this.http.post('https://formcarry.com/s/aegbC6D9Xdc', this.formEmpleado.value).subscribe(
        response => {
          console.log('Formulario enviado con éxito', response);
          // Redirigir o mostrar un mensaje de éxito
        },
        error => {
          console.error('Error al enviar el formulario', error);
          // Manejar el error
        }
      );
    } */
  }
}

