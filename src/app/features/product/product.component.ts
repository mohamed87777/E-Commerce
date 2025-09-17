import { Component, inject, OnInit } from '@angular/core';
import { Product } from '../../core/models/product.interface';
import { CardComponent } from "../../shared/components/card/card.component";
import { ProductsService } from '../../core/services/products/products.service';
import {NgxPaginationModule} from 'ngx-pagination';
import { SearchPipe } from '../../shared/pipes/search-pipe';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-product',
  imports: [CardComponent,NgxPaginationModule,SearchPipe,FormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
 private readonly productsService = inject(ProductsService);


  productList: Product[] = [];
text:string=""
  pageSize!:number;
  p!:number;
  total!:number;
  ngOnInit(): void {
    this.getAllProductsData();
  }

  getAllProductsData(pageNumber:number=1): void {
    this.productsService.getAllProducts(pageNumber).subscribe({
      next: (res) => {
        this.productList = res.data;
        this.pageSize=res.metadata.limit;
        this.p=res.metadata.currentPage;
        this.total=res.results;
      },
      
    });
  }

}
