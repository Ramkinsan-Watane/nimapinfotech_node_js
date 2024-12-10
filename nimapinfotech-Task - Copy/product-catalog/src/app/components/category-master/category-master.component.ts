import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-category-master',
  templateUrl: './category-master.component.html',
  styleUrls: ['./category-master.component.css'],
})
export class CategoryMasterComponent implements OnInit {
  categories: any[] = [];
  newCategoryName: string = '';
  editingCategory: any = null;
  errorMessage: string = ''; // Added for error feedback

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  // Fetch all categories
  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
        this.errorMessage = ''; // Clear error message if successful
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
        this.errorMessage = 'Failed to load categories. Please try again later.';
      },
    });
  }

  // Add a new category
  addCategory(): void {
    if (this.newCategoryName.trim()) {
      this.categoryService.addCategory(this.newCategoryName).subscribe({
        next: () => {
          this.newCategoryName = ''; // Reset input field
          this.loadCategories(); // Refresh the category list
        },
        error: (err) => {
          console.error('Error adding category:', err);
          this.errorMessage = 'Failed to add category. Please try again.';
        },
      });
    } else {
      this.errorMessage = 'Category name cannot be empty.'; // Show validation error
    }
  }

  // Start editing a category
  editCategory(category: any): void {
    this.editingCategory = { ...category }; // Clone category object
  }
updateCategory(): void {
  if (this.editingCategory && this.editingCategory.name.trim()) {
    this.categoryService
      .updateCategory(this.editingCategory.id, this.editingCategory.name)
      .subscribe({
        next: () => {
          this.editingCategory = null; // Clear editing mode
          this.loadCategories(); // Reload categories after update
        },
        error: (err) => {
          console.error('Error updating category:', err);
          this.errorMessage = 'Failed to update category. Please try again.';
        },
      });
  } else {
    this.errorMessage = 'Category name cannot be empty.'; // Validation message
  }
}

  // Delete a category
  deleteCategory(id: number): void {
    if (confirm('Are you sure you want to delete this category?')) {
      this.categoryService.deleteCategory(id).subscribe({
        next: () => {
          this.loadCategories(); // Refresh the category list
        },
        error: (err) => {
          console.error('Error deleting category:', err);
          this.errorMessage = 'Failed to delete category. Please try again.';
        },
      });
    }
  }
}
