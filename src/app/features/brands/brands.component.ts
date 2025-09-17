import { Component, inject, OnInit } from '@angular/core';
import { BrandsService } from './services/brands.service';
import { IBrands } from './models/ibrands.interface';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css'],
  standalone: true
})
export class BrandsComponent implements OnInit {
  private readonly brandsService = inject(BrandsService);

  brandsList: IBrands[] = [];
  selectedBrand?: IBrands;

  ngOnInit(): void {
    this.getAllBrandsData();
  }

  getAllBrandsData(): void {
    this.brandsService.getAllBrands().subscribe({
      next: (res) => {
        this.brandsList = res.data;
      },
      
    });
  }

  getSpecificBrandsData(id: string): void {
    this.brandsService.getSpecificBrandItem(id).subscribe({
      next: (res) => {
        this.selectedBrand = res.data;
      },
      
    });
  }

  closeModal(): void {
    this.selectedBrand = undefined;
  }
}
