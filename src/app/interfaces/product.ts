export interface IProduct {
  equipoid: number;
  codJce: string;
  serial: string;
  categoria: string;
  marca: string;
  modelo: string;
  estado: string;
  localidad:string;
}

export interface ICategoria {
  categoriaId: number;
  descripcion: string;
  estadoid?: number;
  estado?: string;
}

export interface IEstado {
  estadoId: number;
  descripcion: string;
  tipoEstado: number;
}

export interface ILocalidad {
localidadId: number;
descripcion: string;
estadoId: number;
}

export interface IMarca {
  marcaId: number;
  descripcion: string;
  categoriaid: number;
  categoria?: string;
  estadoid?: number;
  estado?: string;
}

export interface IModelo {
  modeloId: number;
  descripcion: string;
  marcaid: number;
  estadoid: number;
  categoriaid: number;
}
