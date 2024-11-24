import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SeguridadService } from '../components/seguridad/seguridad.service';

export const esAdminGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const _seguridadService = inject(SeguridadService);
  const rol = _seguridadService.obtenerRol();

  if(_seguridadService.obtenerRol() === 'admin') {
   /*  router.navigate(['/']); */
   //console.log(rol)
    return true;
  }

  router.navigate(['/dashboard']);
  return false;
};
