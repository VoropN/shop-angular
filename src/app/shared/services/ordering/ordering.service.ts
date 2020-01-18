import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../../models/product/product.model';
import { LocalStorageService } from '../localStorage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class OrderingService {
  private orderedProducts: Product[];
  private orderedProductsChanged$: BehaviorSubject<Product[]>;

  constructor(private localStorageService: LocalStorageService) {
    this.orderedProducts = this.localStorageService.getAddedProducts();
    this.orderedProductsChanged$ = new BehaviorSubject(this.orderedProducts);
  }

  private saveOrderedProducts(): void {
    this.localStorageService.saveAddedProducts(this.orderedProducts);
    this.orderedProductsChanged$.next(this.orderedProducts);
  }

  public get orderedProductsChanged(): BehaviorSubject<Product[]> {
    return this.orderedProductsChanged$;
  }

  public addToCart(product: Product): void {
    this.orderedProducts.push(product);
    this.saveOrderedProducts();
  }

  public deleteFromCart(product: Product): void {
    this.orderedProducts = this.orderedProducts.filter((prod) => prod.id !== product.id);
    this.saveOrderedProducts();
  }
}
