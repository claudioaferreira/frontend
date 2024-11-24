import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoriaService } from '../../../../services/categoria.service';
import { ICategoria, IEstado, IMarca } from '../../../../interfaces/product';
import { MarcaService } from '../../../../services/marca.service';
import { ProductService } from '../../../../services/product.service';

@Component({
  selector: 'app-marcas-crear',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './marcas-crear.component.html',
  styleUrl: './marcas-crear.component.css'
})
export class MarcasCrearComponent implements OnInit {
  @Input('id') marcaId!: number;

  private route = inject(Router);
  private http = inject(HttpClient);

  private formBuild = inject(FormBuilder);
  private _categoriaService = inject(CategoriaService);
  private _marcaService = inject(MarcaService);
  private _productService = inject(ProductService);
  test: boolean = true;

  estadoList: IEstado[] = [];
  marcaList: IMarca[] = [];
  categoriaList: ICategoria[] = [];


  public formMarca: FormGroup = this.formBuild.group({
    descripcion: ['', { validators: [Validators.required] }],
    estadoid: ['', { validators: [Validators.required] }],
    categoriaid: ['', { validators: [Validators.required] }],
  })


  ngOnInit(): void {
    //Si el idCategoria es diferente de 0 - obtener categoria desde base de datos

    //****PARA editar CATEGORIA ****/
    if (this.marcaId != 0) {
      this._marcaService.getMarcaID(this.marcaId).subscribe({
        next: (data) => {
          this.formMarca.patchValue({
            descripcion: data.body[0].descripcion,
            estadoid: data.body[0].estadoId,
            categoriaid: data.body[0].categoriaId
          })
        }, error: (error) => {
          console.log('Error al obtener marca:', error);
        }
      })
    }
    this.getEstado();
    this.getCategoria();
  }


  getEstado() {
    this._productService.getEstados().subscribe(data => {
      this.estadoList = data.body as IEstado[];
      //console.log(this.estadoList)
    });

  }

  getCategoria() {
    this._categoriaService.getCategorias().subscribe(data => {
      this.categoriaList = data.body as ICategoria[];
      //console.log(this.categoriaList)
    });

  }

  guardarMarca() {
    //creamos un objecto con los datos de la marca del tipo Marca
    const obj: IMarca = {
      marcaId: 0,
      descripcion: this.formMarca.get('descripcion')?.value,
      estadoid: this.formMarca.get('estadoid')?.value,
      categoriaid: this.formMarca.get('categoriaid')?.value
    }

    console.log('objeto:', obj);
  }

  volver() {
    this.route.navigate(['/mantenimiento/marca-master']);
  }

}
