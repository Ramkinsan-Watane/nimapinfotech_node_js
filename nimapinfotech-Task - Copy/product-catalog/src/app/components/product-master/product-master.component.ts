import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-product-master',
  templateUrl: './product-master.component.html',
  styleUrls: ['./product-master.component.css'],
})
export class ProductMasterComponent implements OnInit {
  products: any[] = [];
  categories: any[] = [];
  newProductName = '';
  selectedCategoryId: number | null = null;
  editingProduct: any = null;
  page = 1;
  pageSize = 10;
  totalCount = 0;
  totalPages = 0;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
  }

  // Fetch products from the backend
  loadProducts(): void {
    this.productService
      .getProducts(this.page, this.pageSize)
      .subscribe((response: any) => {
        this.products = response.products; // Array of products
        this.totalCount = response.totalCount; // Total number of products
        this.totalPages = response.totalPages; // Total pages
      });
  }

  // Fetch categories from the backend
  loadCategories(): void {
    this.categoryService.getCategories().subscribe((data: any[]) => {
      this.categories = data;
    });
  }

  // Add a new product
addProduct(): void {
  if (this.newProductName.trim() && this.selectedCategoryId) {
    this.productService
      .addProduct(this.newProductName, this.selectedCategoryId)
      .subscribe({
        next: () => {
          this.newProductName = '';
          this.selectedCategoryId = null;
          this.loadProducts();
        },
        error: (err) => {
          console.error('Error adding product:', err);
          alert('There was an issue adding the product');
        }
      });
  }
}


  // Start editing an existing product
  editProduct(product: any): void {
    this.editingProduct = { ...product }; // Clone the product object
  }

  // Save the updated product
  updateProduct(): void {
    if (this.editingProduct) {
      this.productService
        .updateProduct(
          this.editingProduct.id,
          this.editingProduct.productName,
        
        )
        .subscribe(() => {
          this.editingProduct = null;
          this.loadProducts();
        });
    }
  }

  // Delete an existing product
  deleteProduct(id: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe(() => {
        this.loadProducts();
      });
    }
  }

  // Handle pagination (next and previous pages)
  changePage(next: boolean): void {
    if (next && this.page < this.totalPages) {
      this.page++;
    } else if (!next && this.page > 1) {
      this.page--;
    }
    this.loadProducts();
  }
}
