import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { Product } from 'src/app/shared/models/product/product.model';
import { OrderingService } from 'src/app/shared/services/ordering/ordering.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss']
})
export class CartListComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject();
  public orderedProducts: Product[];

  constructor(private orderingService: OrderingService) { }

  public ngOnInit(): void {
    this.orderingService.orderedProductsChanged
    .pipe(takeUntil(this.destroy$))
    .subscribe((products) => this.orderedProducts = products);
  }

  public trackByProducts(index: number, product: Product): number {
    return product.id;
  }

  public deleteFromCart(product: Product): void {
    this.orderingService.deleteFromCart(product);
  }

  public getTotalCost(): number {
    return this.orderedProducts.reduce((acc, product) => acc + product.price, 0);
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
