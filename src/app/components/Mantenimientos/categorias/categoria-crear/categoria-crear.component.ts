import { HttpClient } from '@angular/common/http';
import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ICategoria, IEstado } from '../../../../interfaces/product';
import { ProductService } from '../../../../services/product.service';
import { CommonModule } from '@angular/common';
import { CategoriaService } from '../../../../services/categoria.service';

@Component({
  selector: 'app-categoria-crear',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './categoria-crear.component.html',
  styleUrl: './categoria-crear.component.css'
})
export class CategoriaCrearComponent implements OnInit {
  @Input('id') idCategoria!: number;


  private route = inject(Router);
  private http = inject(HttpClient);
  //Para crear un formulario
  private formBuild = inject(FormBuilder);
  private _productService = inject(ProductService);
  private _categoriaService = inject(CategoriaService);
  estadoList: IEstado[] = [];
  categoriaList: ICategoria[] = [];

  //Para crear un formulario
  public formCategoria: FormGroup = this.formBuild.group({
    descripcion: ['', { validators: [Validators.required] }],
    estadoid: ['', { validators: [Validators.required] }],
  })



  ngOnInit(): void {
    //Si el idCategoria es diferente de 0 - obtener categoria desde base de datos

    //****PARA editar CATEGORIA ****/

    if (this.idCategoria != 0) {
      this._categoriaService.getCategoriaID(this.idCategoria).subscribe({
        next: (data) => {

          this.formCategoria.patchValue({
            descripcion: data.body[0].descripcion,
            estadoid: data.body[0].estadoId
          })
          console.log(this.formCategoria.value);
        },

        error: (error) => {
          console.log('Error al obtener categoria:', error);
        }
      });
    }
    this.getEstado();

  }

  //****PARA GUARDAR CATEGORIA ****/
  guardarCategoria() {

    //creamos un objecto con los datos de la categoria del tipo Categoria
    const obj: ICategoria = {
      categoriaId: 0,
      descripcion: this.formCategoria.get('descripcion')?.value,
      estadoid: this.formCategoria.get('estadoid')?.value

    }
    console.log('objeto:', obj);

    //****PARA CREAR CATEGORIA ****/
    if (this.idCategoria == 0) {
      console.log('Desde crear: idCategoria ' + this.idCategoria)
    }

    //De lo contrario editar empleado
    else {
      console.log('Editando categoria:', obj);
      console.log('Desde editar: idCategoria ' + this.idCategoria)

    }


  }

  volver() {
    this.route.navigate(['/mantenimiento/categorias-master']);
  }

  getEstado() {
    this._productService.getEstados().subscribe(data => {
      this.estadoList = data.body as IEstado[];
    });
  }
}

