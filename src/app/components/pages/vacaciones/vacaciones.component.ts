import { CommonModule } from '@angular/common';
import { Component, model } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { differenceInCalendarDays } from 'date-fns'; // Una librería útil (opcional)

@Component({
  selector: 'app-vacaciones',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatCardModule, MatDatepickerModule, MatNativeDateModule, MatInputModule],
  templateUrl: './vacaciones.component.html',
  styleUrl: './vacaciones.component.css'
})
export class VacacionesComponent {

  selected = model<Date | null>(null);

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

  citasList = [
    {
      empleadoNombre: 'Juan Pérez',
      fechaInicio: '2024-11-28',
      fechaFin: '2024-12-02',
      descripcion: 'Vacaciones de fin de año'
    },
    {
      empleadoNombre: 'Pedro Henriquez',
      fechaInicio: '2024-12-02',
      fechaFin: '2024-12-09',
      descripcion: 'Vacaciones de fin de año'
    }
  ];

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      empleado: ['', Validators.required],
      fechaInicio: ['', [Validators.required, this.validarFormatoFecha]],
  fechaFin: ['', [Validators.required, this.validarFormatoFecha]],
      descripcion: ['', [Validators.required, Validators.maxLength(250)]],
    });
  }
// Validador personalizado
validarFormatoFecha(control: AbstractControl): ValidationErrors | null {
  const regex = /^\d{4}-\d{2}-\d{2}$/; // YYYY-MM-DD
  return regex.test(control.value) ? null : { formatoInvalido: true };
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

  calcularDiasLaborales(fechaInicio: string, fechaFin: string): number {
    const fechaInicioDate = new Date(fechaInicio);
    const fechaFinDate = new Date(fechaFin);
    let diasLaborales = 0;

    for (
      let fecha = new Date(fechaInicioDate);
      fecha <= fechaFinDate;
      fecha.setDate(fecha.getDate() + 1)
    ) {
      const diaSemana = fecha.getDay(); // 0 = domingo, 6 = sábado
      if (diaSemana !== 0 && diaSemana !== 6) {
        diasLaborales++;
      }
    }

    return diasLaborales;
  }


  calcularFechaReingreso(fechaFin: string): string {
    const fechaFinDate = new Date(fechaFin);

    // Encontrar el próximo día laboral
    while (true) {
      fechaFinDate.setDate(fechaFinDate.getDate() + 1);
      const diaSemana = fechaFinDate.getDay(); // 0 = domingo, 6 = sábado
      if (diaSemana !== 0 && diaSemana !== 6) {
        break;
      }
    }

    return fechaFinDate.toISOString().split('T')[0];
  }



  verificarEstadoEmpleado(fechaReingreso: string): string {
    const fechaActual = new Date();
    const fechaReingresoDate = new Date(fechaReingreso);

    if (fechaActual > fechaReingresoDate) {
      return 'Retrasado';
    } else if (fechaActual.toDateString() === fechaReingresoDate.toDateString()) {
      return 'Regresa Hoy';
    } else {
      return `${Math.ceil(
        (fechaReingresoDate.getTime() - fechaActual.getTime()) / (1000 * 60 * 60 * 24)
      )} días restantes`;
    }
  }

  calcularDiasTomados(fechaInicio: string, fechaFin: string): number {
    return this.calcularDiasLaborales(fechaInicio, fechaFin);
  }


}
