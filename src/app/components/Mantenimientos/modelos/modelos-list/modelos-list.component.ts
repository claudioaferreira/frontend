import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule, MatOption } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import { NgModule } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { IAppointmentForm } from '../../../../interfaces/appointmentForm';

@Component({
  selector: 'app-modelos-list',
  standalone: true,
  imports: [MatDatepickerModule, CommonModule, MatNativeDateModule, MatInputModule, FormsModule, MatCardModule,MatButtonModule, ReactiveFormsModule, CommonModule],
  templateUrl: './modelos-list.component.html',
  styleUrl: './modelos-list.component.css'
})

export class ModelosListComponent {

/*   private formBuilder = inject(FormBuilder); */

  form: FormGroup;
  // Lista de empleados
  empleadosList = [
    { id: 1, nombre: 'Juan Pérez' },
    { id: 2, nombre: 'Ana López' },
    { id: 3, nombre: 'Carlos Fernández' },
    { id: 4, nombre: 'María García' },
    { id: 5, nombre: 'Luis Rodríguez' }
  ];

  citasList: any[] = [];


  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      empleado: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
      descripcion: ['', [Validators.required, Validators.maxLength(250)]],
    });
  }

  guardarCita() {
    if (this.form.valid) {
      const cita = {
        ...this.form.value,
        empleadoNombre: this.empleadosList.find(
          (e) => e.id === +this.form.value.empleado
        )?.nombre, // Busca el nombre del empleado para mostrarlo
      };
      this.citasList.push(cita); // Guarda la cita en la lista
      this.form.reset(); // Limpia el formulario
    }
  }
}
