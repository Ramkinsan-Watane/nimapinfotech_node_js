import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:5000/api/products';

  constructor(private http: HttpClient) {}

  // Get products with pagination
  getProducts(page: number, pageSize: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?page=${page}&pageSize=${pageSize}`);
  }

  // Add a new product
  addProduct(name: string, categoryId: number): Observable<any> {
    return this.http.post(this.apiUrl, { name, category_id: categoryId }); // Ensure correct key name 'category_id'
  }

  // Update a product
  updateProduct(id: number, name: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, { name });
  }

  // Delete a product
  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
