import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2'
import { IUser } from '../../../interfaces/user';
import { UserService } from '../../../services/user.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { SpinnerComponent } from "../../../shared/spinner/spinner.component";
import { ErrorService } from '../../../services/error.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, SpinnerComponent],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  username: string = '';
  password: string = '';
  rol: string = 'tecnico';
  confirmPassword: string = '';
  loading: boolean = false;

  /*   constructor() {
      this.router = inject(Router);
    } */

  private _userService = inject(UserService);
  private _errorService = inject(ErrorService);
  private router = inject(Router);

  addUser() {

    //Validar campos
    if (this.username === '' || this.password === '' || this.confirmPassword === '') {
      Swal.fire({
        title: 'Error!',
        text: 'Todo los campos son obligatorios',
        icon: 'error',
        confirmButtonText: 'Cool'
      })
      return;
    }
    //Validar passowrd
    if (this.password != this.confirmPassword) {
      Swal.fire({
        title: 'Error!',
        text: 'Las contraseñas no coinciden',
        icon: 'error',
        confirmButtonText: 'Cool'
      })
      return;
    };

    //Creamos el objeto usuario
    const user: IUser = {
      username: this.username,
      password: this.password,
      rol: this.rol
    }


    this.loading = true;

    this._userService.signIn(user).subscribe({
      next: (v) => {
        this.loading = false;
        //animacion de sweetalert
        Swal.fire({
          title: "Usuario Registrado con exito",
          showClass: {
            popup: `
              animate__animated
              animate__fadeInUp
              animate__faster
            `
          },
          hideClass: {
            popup: `
              animate__animated
              animate__fadeOutDown
              animate__faster
            `
          }
        });
        //end animacion
        this.router.navigate(['/login']);
      },
      error: (e: HttpErrorResponse) => {
        this.loading = false;
        this._errorService.messageError(e);
      }
    })
  }


}
