import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { OffersService } from './offers.service';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private httpClient: HttpClient, private offers: OffersService) {

  }

  getProducts(): Product[] {
     return [
       {id: 1, price: 50, description: "Product 1", releaseDate: new Date(), imageUrl:"https://example.com/product1.jpg"},
       {id: 2, price: 100, description: "Product 2", releaseDate: new Date(), imageUrl:"https://example.com/product2.jpg"},
       {id: 3, price: 150, description: "Product 3", releaseDate: new Date(), imageUrl:"https://example.com/product3.jpg"}
     ];
   }
  getProductsToBeOrdered(): Product[] {
     return [
       {id: 5, price: 30, description: "Product 5", releaseDate: new Date(), imageUrl:"https://example.com/product5.jpg"},
       {id: 6, price: 120, description: "Product 6", releaseDate: new Date(), imageUrl:"https://example.com/product6.jpg"},
     ];
   }
  getProductAsObservable(): Observable<Product[]> {
    return of(this.getProducts());  
   }
   getProductsToBeOrderedAsObservable(): Observable<Product[]> {
    return of(this.getProductsToBeOrdered());  
   }
   getProductFromApi(): Observable<Product[]> {    
    return this.httpClient.get<Product[]>(`${environment.apiBaseUrl}/products`);
  }
}
