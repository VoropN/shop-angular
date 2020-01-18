import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Product } from 'src/app/shared/models/product/product.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { OrderingService } from 'src/app/shared/services/ordering/ordering.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit, OnDestroy {
  @Input() public product: Product;
  private destroy$ = new Subject();
  public isAddedToCart = false;

  constructor(private orderingService: OrderingService) { }

  public ngOnInit(): void {
    this.orderingService.orderedProductsChanged
      .pipe(takeUntil(this.destroy$))
      .subscribe((orderedProducts: Product[]) => {
        this.isAddedToCart = orderedProducts.some(orderedProduct => orderedProduct.id === this.product.id);
      });
  }

  public addToCart(): void {
    this.isAddedToCart = true;
    this.orderingService.addToCart(this.product);
  }

  public deleteFromCart(): void {
    this.isAddedToCart = false;
    this.orderingService.deleteFromCart(this.product);
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
