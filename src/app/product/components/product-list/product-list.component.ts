import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from 'src/app/shared/models/product/product.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  public products$: Observable<Product[]>;

  constructor(private productService: ProductService) { }

  public ngOnInit(): void {
    this.products$ = this.productService.getProducts();
  }

  public trackByProducts(index: number, product: Product): number {
    return product.id;
  }
}
