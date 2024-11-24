import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() { }


  messageError(e: HttpErrorResponse){
    if (e.error.message) {
      Swal.fire({
        title: "Opps!! algo salio mal",
        text: `${e.error.message}`,
        icon: "error"
      });
    } else {
      Swal.fire({
        title: "Opps!! algo salio mal",
        text: `Comuniquese con el administrador`,
        icon: "error"
      });
    }
  }

  messageErrorMessage(e: string){
    if (e) {
      Swal.fire({
        title: "Opps!! algo salio mal",
        text: `${e}`,
        icon: "error"
      });
    } else {
      Swal.fire({
        title: "Opps!! algo salio mal",
        text: `Comuniquese con el administrador`,
        icon: "error"
      });
    }
  }

}
