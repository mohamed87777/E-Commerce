import { Component, inject } from '@angular/core';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { Category } from '../../core/models/category.interface';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
  standalone: true
})
export class CategoriesComponent {
  private readonly categoriesService = inject(CategoriesService);

  categoriesList: Category[] = [];
  selectedSubCategories: Category[] = [];
  activeCategoryId: string | null = null;

  ngOnInit(): void {
    this.getAllCategoriesData();
  }

  getAllCategoriesData(): void {
    this.categoriesService.getAllCategories().subscribe({
      next: (res) => {
        this.categoriesList = res.data;
      }
    });
  }

  onCategoryClick(categoryId: string): void {
    this.activeCategoryId = categoryId;
    this.categoriesService.getSubCategoriesByCategoryId(categoryId).subscribe({
      next: (res) => {
        this.selectedSubCategories = res.data;
      }
    });
  }


getCategoryNameById(id: string): string {
  return this.categoriesList.find(cat => cat._id === id)?.name || 'Selected';
}

}
