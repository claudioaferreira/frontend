import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ReparacionesService } from '../../../services/reparaciones.service';
import { CardDetailsComponent } from "../card-details/card-details.component";
import { HeaderComponent } from "../header/header.component";
import { AutorizadoComponent } from "../../seguridad/autorizado/autorizado.component";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterOutlet, CardDetailsComponent, HeaderComponent, AutorizadoComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  private router = inject(Router);
  cantidadNoAutorizados: number = 0;

  private _reparaciones = inject(ReparacionesService);

  ngOnInit(): void {
    this.getCantidadNoReparados();
  }

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('tokenExpiration');
    this.router.navigate(['/login']);
  }


  getCantidadNoReparados() {
    this._reparaciones.getCantidadNoReparados().subscribe((res: any) => {
      if (!res.error) {
        this.cantidadNoAutorizados = res.body.length;
        //console.log(this.cantidadNoAutorizados);

      }

    }
    );
  }
}
