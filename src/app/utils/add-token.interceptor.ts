import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { ErrorService } from '../services/error.service';

export const addTokenInterceptor: HttpInterceptorFn = (req, next) => {

  const token = localStorage.getItem('token');
  const router = inject(Router);

  const _errorService = inject(ErrorService) ;

  if(token){

    req = req.clone({setHeaders: {Authorization: `Bearer ${token}`}});
  }
  return next(req).pipe(
    catchError((error : HttpErrorResponse) => {
      if(error.status === 401){
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.navigate(['/login']);
        _errorService.messageError(error);
      }
      return throwError(error);
    })
  );
};
