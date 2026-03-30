import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { CommonModule } from '@angular/common';
import { ProductsTableComponent } from "../products-table/products-table.component";
import { ProductDetailsComponent } from "../product-details/product-details.component";
import { ProductsService } from '../../services/products.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [CommonModule, ProductsTableComponent, ProductDetailsComponent],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css'
})
export class ProductPageComponent implements OnInit,  OnDestroy {
  products: Product[] = [];
  productsToBeOrdered: Product[] | undefined = undefined;
  selectedProduct: Product | undefined = undefined;
  subscriptionProducts: Subscription | undefined = undefined;
  subscriptionProductsToBeOrdered: Subscription | undefined = undefined;

  constructor(private service:ProductsService) {
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
    this.selectedProduct = payload;
  }
  onNotifyToBeOrdered(payload: Product): void {
    this.selectedProduct = payload;
  }

}
