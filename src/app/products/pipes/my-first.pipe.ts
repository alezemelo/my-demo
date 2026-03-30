import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/product';

@Pipe({
  name: 'myFirst',
  standalone: true
})
export class MyFirstPipe implements PipeTransform {

  transform(product: Product): string  {
    const description = product.description.replace(/u/g, "***");
    return description;
  }

}
