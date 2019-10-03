import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Subject, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ProductService } from '../product.service';

@Component({
  selector: 'pm-product-detail',
  templateUrl: './product-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailComponent {
  pageTitle = 'Product Detail';
  private errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();

  selectedProduct$ = this.productService.selectedProduct$
    .pipe(
      catchError(err =>  {
        this.errorMessageSubject.next(err);
        return EMPTY;
      })
    );

  selectedProductSuppliers$ = this.productService.selectedProductSuppliers$
    .pipe(
      catchError(err =>  {
        this.errorMessageSubject.next(err);
        return EMPTY;
      })
    );

  constructor(private productService: ProductService) { }

}
