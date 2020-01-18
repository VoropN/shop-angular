import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrderingService } from './shared/services/ordering/ordering.service';
import { Product } from './shared/models/product/product.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  public countOrderedProducts = 0;
  private destroy$ = new Subject();

  constructor(private orderingService: OrderingService) { }

  public ngOnInit(): void {
    this.orderingService.orderedProductsChanged
      .pipe(takeUntil(this.destroy$))
      .subscribe((orderedProducts: Product[]) => {
        this.countOrderedProducts = orderedProducts.length;
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
