import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Api } from 'src/app/shared/environment/api.enum';
import { Observable } from 'rxjs';
import { Product } from 'src/app/shared/models/product/product.model';
import { catchError, retry } from 'rxjs/operators';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler/error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService
  ) { }

  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(Api.products)
      .pipe(
        retry(2),
        catchError((error) => this.errorHandler.handleResponceError(error, 'Can\'t load products!'))
      );
  }
}
