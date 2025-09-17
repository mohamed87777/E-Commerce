import { OwlOptions } from './../../../../../../node_modules/ngx-owl-carousel-o/lib/models/owl-options.model.d';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../../../core/services/categories/categories.service';
import { Category } from '../../../../core/models/category.interface';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-popular-categories',
  imports: [CarouselModule,RouterLink ],
  templateUrl: './popular-categories.component.html',
  styleUrl: './popular-categories.component.css'
})
export class PopularCategoriesComponent implements OnInit {
private readonly categoriesService=inject(CategoriesService);

categoriesList:Category[]=[];
categoriesOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    autoplay:true,
    autoplayTimeout:3500,
    autoplayHoverPause:true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
   navText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      },
      1140: {
        items: 6
      }
    },
    nav: true
  }


  ngOnInit(): void {
    this.getAllCategoriesData();
  }


getAllCategoriesData():void{
  this.categoriesService.getAllCategories().subscribe({
    next:(res)=>{
      
      
this.categoriesList=res.data;      
    },
    error:(err)=>{
      console.log(err);
      
    }
  })
}

}
