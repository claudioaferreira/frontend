import { mapToCanActivate, Routes } from '@angular/router';
import { LoginComponent } from './components/Usuario/login/login.component';
import { SignInComponent } from './components/Usuario/sign-in/sign-in.component';
import { authGuard } from './guards/auth.guard';
import { AuthReparacionesComponent } from './components/pages/auth-reparaciones/auth-reparaciones.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { MainComponent } from './components/pages/main/main.component';
import { LayoutComponent } from './components/layout/layout..component';
import { esAdminGuard } from './guards/es-admin.guard';
import { EquiposListComponent } from './components/Mantenimientos/Equipos/equipos-list/equipos-list.component';
import { EquiposCrearComponent } from './components/Mantenimientos/Equipos/equipos-crear/equipos-crear.component';
import { MantenimientoLayoutComponent } from './components/Mantenimientos/mantenimiento-layout/mantenimiento-layout.component';
import { MantenimientoOpcionesComponent } from './components/Mantenimientos/mantenimiento-opciones/mantenimiento-opciones.component';
import { CategoriaCrearComponent } from './components/Mantenimientos/categorias/categoria-crear/categoria-crear.component';
import { CategoriaMasterComponent } from './components/Mantenimientos/categorias/categoria-master/categoria-master.component';
import { MarcasCrearComponent } from './components/Mantenimientos/marcas/marcas-crear/marcas-crear.component';
import { MarcasListComponent } from './components/Mantenimientos/marcas/marcas-list/marcas-list.component';
import { ModelosCrearComponent } from './components/Mantenimientos/modelos/modelos-crear/modelos-crear.component';
import { ModelosEditarComponent } from './components/Mantenimientos/modelos/modelos-editar/modelos-editar.component';
import { ModelosListComponent } from './components/Mantenimientos/modelos/modelos-list/modelos-list.component';
import { LocalidadCrearComponent } from './components/Mantenimientos/localidad/localidad-crear/localidad-crear.component';
import { LocalidadEditarComponent } from './components/Mantenimientos/localidad/localidad-editar/localidad-editar.component';
import { LocalidadListComponent } from './components/Mantenimientos/localidad/localidad-list/localidad-list.component';
import { UsuariosCrearComponent } from './components/Mantenimientos/usuarios/usuarios-crear/usuarios-crear.component';
import { UsuariosEditarComponent } from './components/Mantenimientos/usuarios/usuarios-editar/usuarios-editar.component';
import { UsuariosListComponent } from './components/Mantenimientos/usuarios/usuarios-list/usuarios-list.component';
import { EmpleadoMasterComponent } from './components/Mantenimientos/empleados/empleado-master/empleado-master.component';
import { EmpleadoCrearComponent } from './components/Mantenimientos/empleados/empleado-crear/empleado-crear.component';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signin', component: SignInComponent },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {path: 'dashboard', component: DashboardComponent, canActivate: [authGuard]},
      { path: 'main-content', component: MainComponent, canActivate: [authGuard]},
      { path: 'auth-reparaciones', component: AuthReparacionesComponent, canActivate: [authGuard, esAdminGuard]},


      { path: 'mantenimiento', component: MantenimientoLayoutComponent, canActivate: [authGuard, esAdminGuard],
        children: [
          { path: '', redirectTo: 'opciones', pathMatch: 'full' },
          { path: 'opciones', component: MantenimientoOpcionesComponent },
          { path: 'equipo-crear/:id', loadComponent:()=> import('./components/Mantenimientos/Equipos/equipos-crear/equipos-crear.component').then(c => c.EquiposCrearComponent)},
          { path: 'equipo-list', component: EquiposListComponent},
          { path: 'marcas-crear/:id', component: MarcasCrearComponent},
          { path: 'marcas-list', component: MarcasListComponent},
          { path: 'modelos-crear/:id', component: ModelosCrearComponent},
          { path: 'modelos-list', component: ModelosListComponent},
          { path: 'localidad-crear/:id', component: LocalidadCrearComponent},
          { path: 'localidad-list', component: LocalidadListComponent},
          { path: 'usuarios-crear/:id', component: UsuariosCrearComponent},
          { path: 'usuarios-list', component: UsuariosListComponent},
          { path: 'categorias-crear/:id', loadComponent:()=> import('./components/Mantenimientos/categorias/categoria-crear/categoria-crear.component').then(c => c.CategoriaCrearComponent)},
          { path: 'categorias-master', loadComponent:()=> import('./components/Mantenimientos/categorias/categoria-master/categoria-master.component').then(c => c.CategoriaMasterComponent)},
          { path: 'empleado-master', loadComponent:()=> import('./components/Mantenimientos/empleados/empleado-master/empleado-master.component').then(c => c.EmpleadoMasterComponent)},
          { path: 'empleado-crear/:id',loadComponent:()=> import('./components/Mantenimientos/empleados/empleado-crear/empleado-crear.component').then(c => c.EmpleadoCrearComponent)},
        ]
      },
    ]
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];
