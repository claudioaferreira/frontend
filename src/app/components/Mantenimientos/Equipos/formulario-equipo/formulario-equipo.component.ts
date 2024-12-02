import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ErrorService } from '../../../../services/error.service';
import { ICategoria, IEstado, ILocalidad, IMarca, IModelo, IProduct } from '../../../../interfaces/product';
import { ProductService } from '../../../../services/product.service';
import { IResponseJSON } from '../../../../interfaces/responseJSON';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-formulario-equipo',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './formulario-equipo.component.html',
  styleUrl: './formulario-equipo.component.css'
})
export class FormularioEquipoComponent implements OnInit {

  @Input()
   equipo: IProduct | undefined;

  @Output()
  posteoFormulario = new EventEmitter<IProduct>();

  private formBuilder = inject(FormBuilder);
  private _productService = inject(ProductService);
  private _errorService = inject(ErrorService);

  categoriaList: ICategoria[] = [];
  marcaList: IMarca[] = [];
  modeloList: IModelo[] = [];
  estadoList: IEstado[] = [];
  localidadList: ILocalidad[] = [];

  codigoExiste: boolean | null = null;
  serialExiste: boolean | null = null;

  form = this.formBuilder.group({
    equipoid: [0],
    codigo: ['', { validators: [Validators.required, Validators.minLength(6), Validators.pattern('^[0-9]*$')], updateOn: 'blur' }],
    Serial: ['', Validators.required],
    Categoria: ['', Validators.required],
    Marca: ['', Validators.required],
    Modelo: ['', Validators.required],
    Estado: ['', Validators.required],
    Localidad: ['', Validators.required],
  });


  ngOnInit(): void {
    if (this.equipo) {
      this.form.patchValue({
        /* equipoid: this.equipo.equipoid, */
        codigo: this.equipo.codJce,
        Serial: this.equipo.serial,
        Categoria: this.equipo.categoria,
        Marca: this.equipo.marca,
        Modelo: this.equipo.modelo,
        Estado: this.equipo.estado,
        Localidad: this.equipo.localidad
      });
    }
    this.form.get('codigo')?.valueChanges.subscribe(value => {
      this.verificarCodigo();
      this.verificarSerial();
    });

    this._productService.getCategorias().subscribe(data => {
      this.categoriaList = data.body as ICategoria[];
      //console.log(data)

    });

    //Suscribirse a los cambios en el campo de categoria
    this.form.get('Categoria')?.valueChanges.subscribe(categoriaId => {
      if (categoriaId) {
        const categoriaIdNumber = Number(categoriaId); // Convertir a número
        //Peticion al servicio
        this._productService.getMarcasByCategoria(categoriaIdNumber).subscribe((data: IResponseJSON) => {
          this.marcaList = data.body as IMarca[];
          this.form.get('Marca')?.setValue(''); // Resetear el campo de marca
        });
      } /* else {
        this._errorService.messageErrorMessage("Error en el campo de marca o no existe");
      } */
    });

    this.form.get('Marca')?.valueChanges.subscribe(marcaid => {
      if (marcaid) {
        /*         console.log('Valor cambiado en Marca:', marcaid); */
        const marcaIdNumber = Number(marcaid);
        //Peticion al servicio
        this._productService.getModelosByMarca(marcaIdNumber).subscribe((data: IResponseJSON) => {
          this.modeloList = data.body as IModelo[];
          this.form.get('Modelo')?.setValue(''); // Resetear el campo de modelo
        });
      } /* else {
        this._errorService.messageErrorMessage("Error en el campo de modelo o no existe");
      } */
    });
    this.getEstado();
    this.getLocalidad();
  }

  verificarCodigo(): void {
    const codigo = this.form.get('codigo')?.value;
    const Serial = this.form.get('Serial')?.value;

    if (codigo && codigo.length >= 5) {
      this._productService.verificarCodigoYSerial(codigo).subscribe(response => {
        console.log(response)
        this.codigoExiste = response.error;
        /* this.serialExiste = response.existe; */
      });
    }
  }

  verificarSerial(): void {
     const Serial = this.form.get('Serial')?.value;

    if (Serial && Serial.length >= 5) {
      this._productService.verificarCodigoYSerial(Serial).subscribe(response => {
        console.log(response)
        this.serialExiste = response.error;
        /* this.serialExiste = response.existe; */
      });
    }
  }

  getEstado() {
    this._productService.getEstados().subscribe(data => {
      this.estadoList = data.body as IEstado[];
    });
  }

  getLocalidad() {
    this._productService.getLocalidad().subscribe(data => {
      this.localidadList = data.body as ILocalidad[];
    });
  }

  guardarCambios() {
    /* console.log(this.form.value); */

    if (!this.form.valid) {
      this._errorService.messageErrorMessage("Error en el formulario");
      return;
    }

    const product = this.form.value as IProduct;

    //para enviar el objeto al componente padre
    this.posteoFormulario.emit(product);
  }
}
