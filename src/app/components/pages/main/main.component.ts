import { Component } from '@angular/core';
import { CardDetailsComponent } from "../card-details/card-details.component";
import { CommonModule } from '@angular/common';
import { AutorizadoComponent } from "../../seguridad/autorizado/autorizado.component";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CardDetailsComponent, CommonModule, AutorizadoComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
