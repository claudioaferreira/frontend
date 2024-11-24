import { ITestEmpleado } from "./testEmpleado";

export interface IResponseJSON{
  error: boolean;
  status: number;
  body: any[];
}

export interface IResponseAPINET {
  isSuccess: boolean;
  data: ITestEmpleado[]; // Agregar la propiedad data
}
