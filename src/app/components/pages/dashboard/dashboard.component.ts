import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NavbarComponent } from '../navbar/navbar.component';
import { CardDetailsComponent } from '../card-details/card-details.component';
import { HeaderComponent } from '../header/header.component';
import { ProductService } from '../../../services/product.service';
import { IProduct } from '../../../interfaces/product';
import { MainComponent } from "../main/main.component";


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavbarComponent, CardDetailsComponent, HeaderComponent, MainComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DashboardComponent implements OnInit {

  private _productService = inject(ProductService);
  productList : IProduct[] = [];

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
    this._productService.getProducts().subscribe((res : IProduct[]) => {
      this.productList = res;
      //console.log(res);
    });
  }
}
