import { Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class OffersService {

  constructor() { }
  calculateDiscount(product: Product): number{
    if(product.id%2==0){
      return 0.2;
    }
    return 0.35;
  }


}
