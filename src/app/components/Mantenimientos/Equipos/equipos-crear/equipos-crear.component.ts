import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ProductService } from '../../../../services/product.service';
import { ICategoria, IEstado, ILocalidad, IMarca, IModelo, IProduct } from '../../../../interfaces/product';
import { CommonModule } from '@angular/common';
import { IResponseJSON } from '../../../../interfaces/responseJSON';
import { ErrorService } from '../../../../services/error.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormularioEquipoComponent } from "../formulario-equipo/formulario-equipo.component";
import {MatCardModule} from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-equipos-crear',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule, FormularioEquipoComponent, MatCardModule, MatInputModule, MatFormFieldModule, MatButtonModule],
  templateUrl: './equipos-crear.component.html',
  styleUrl: './equipos-crear.component.css'
})
export class EquiposCrearComponent  {

   private router = inject(Router);

   guardarCambios(producto: IProduct) {
    console.log('creando el producto: ' + JSON.stringify(producto, null, 2));
  }
}
