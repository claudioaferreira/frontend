import { Component } from '@angular/core';
import { NavbarComponent } from "../pages/navbar/navbar.component";
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "../pages/header/header.component";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet, HeaderComponent],
  templateUrl: './layout..component.html',
  styleUrl: './layout..component.css'
})
export class LayoutComponent {

}
