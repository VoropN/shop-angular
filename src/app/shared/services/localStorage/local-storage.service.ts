import { Injectable } from '@angular/core';
import { Product } from '../../models/product/product.model';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  public getAddedProducts(): Product[] {
    const addedProducts = localStorage.getItem('products');
    return (JSON.parse(addedProducts) || []) as Product[];
  }

  public saveAddedProducts(product: Product[]): void {
    localStorage.setItem('products', JSON.stringify(product));
  }

  public clearProducts(): void {
    localStorage.setItem('products', JSON.stringify([]));
  }
}
