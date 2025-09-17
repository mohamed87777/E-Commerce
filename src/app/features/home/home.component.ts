import { Component, OnInit } from '@angular/core';
import { MainSliderComponent } from "./component/main-slider/main-slider.component";
import { PopularCategoriesComponent } from "./component/popular-categories/popular-categories.component";
import { PopularProductsComponent } from "./component/popular-products/popular-products.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ MainSliderComponent, PopularCategoriesComponent, PopularProductsComponent ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  
}
