import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { CommonModule } from '@angular/common';
import { ProductsTableComponent } from "../products-table/products-table.component";
import { ProductsService } from '../../services/products.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [CommonModule, ProductsTableComponent],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css'
})
export class ProductPageComponent implements OnInit,  OnDestroy {
  products: Product[] = [];
  productsToBeOrdered: Product[] | undefined = undefined;
  subscriptionProducts: Subscription | undefined = undefined;
  subscriptionProductsToBeOrdered: Subscription | undefined = undefined;

  constructor(private router: Router, private service:ProductsService) {
    //this.products = this.service.getProducts();
    //this.productsToBeOrdered = this.service.getProductsToBeOrdered();

  }
  ngOnDestroy(): void {
    this.subscriptionProducts?.unsubscribe();
    this.subscriptionProductsToBeOrdered?.unsubscribe();
  }
  ngOnInit(): void {
    this.subscriptionProducts=this.service.getProductFromApi().subscribe(
      x => this.products = x
    );
    this.subscriptionProductsToBeOrdered=this.service.getProductsToBeOrderedAsObservable().subscribe(
      y => this.productsToBeOrdered = y
    );
  }
 
  onNotify(payload: Product): void {
    this.router.navigate(['/products', payload.id]);
  }
  onNotifyToBeOrdered(payload: Product): void {
    this.router.navigate(['/products', payload.id]);
  }

}
