import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2'
import { IUser } from '../../../interfaces/user';
import { UserService } from '../../../services/user.service';
import { ILoginResponseToken } from '../../../interfaces/loginResponseToken';
import { HttpErrorResponse } from '@angular/common/http';
import { SpinnerComponent } from "../../../shared/spinner/spinner.component";
import { ErrorService } from '../../../services/error.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, SpinnerComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  username: string = '';
  password: string = '';
  loading: boolean = false;
  private readonly llaveToken = 'token';
  private readonly llaveExpiracion = 'token-expiration';

  private _userService = inject(UserService);
  private _errorService = inject(ErrorService);
  private router = inject(Router);

  ngOnInit(): void {
      this.ifLogin()
  }

  login(){

    //validar campos
    if(this.username == '' && this.password == ''){
      Swal.fire({
        title: 'Error?',
        text: "Todos los campos son obligatorios",
        icon: 'error',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ok'
      });
      return;
    }

    //Creamos el objecto User para enviarlo al servicio
    const user : IUser = {
      username: this.username,
      password: this.password
    }

    this.loading = true;
    this._userService.login(user).subscribe({
      next: (response: ILoginResponseToken) => {
        const tokenReceived = response.token;
        const tokenExpiration = response.expiresIn;
        //console.log('respuesta logueado' + response.token)
        console.log(response.expiresIn)
        /* console.log(tokenReceived); */
        localStorage.setItem('token', tokenReceived);
        localStorage.setItem('tokenExpiration', tokenExpiration);

        this.router.navigate(['/dashboard']);
        this.loading = false;
      },
      error: (e: HttpErrorResponse) => {
        this._errorService.messageError(e);
        this.loading = false;
      }
    })
  }

  ifLogin(){
    this._userService.estaLogueado();

    if(this._userService.estaLogueado()){
      this.router.navigate(['/dashboard']);
    }
  }

}
