import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Subject, EMPTY, combineLatest } from 'rxjs';
import { catchError, map, filter } from 'rxjs/operators';

import { ProductService } from '../product.service';

@Component({
  selector: 'pm-product-detail',
  templateUrl: './product-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailComponent {
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

  pageTitle$ = this.selectedProduct$
    .pipe(
      map(product =>
        product ? `Product Detail for: ${product.productName}` : null)
    );

  vm$ = combineLatest([
    this.selectedProduct$,
    this.selectedProductSuppliers$,
    this.pageTitle$
  ]).pipe(
    filter(([product]) => Boolean(product)),
    map(([product, productSuppliers, pageTitle]) => ({
      product,
      productSuppliers,
      pageTitle
    }))
  );

  constructor(private productService: ProductService) { }

}
