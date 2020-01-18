import { Component, Input } from '@angular/core';
import { Product } from 'src/app/shared/models/product/product.model';
import { OrderingService } from 'src/app/shared/services/ordering/ordering.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent {
  @Input() public product: Product;

  constructor(private orderingService: OrderingService) { }

  public addToCart(): void {
    this.orderingService.addToCart(this.product);
  }

  public deleteFromCart(): void {
    this.orderingService.deleteFromCart(this.product);
  }
}
