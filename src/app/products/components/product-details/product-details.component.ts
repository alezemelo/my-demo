import { Component, Input, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnDestroy {
   
  product: Product | undefined = undefined;
  subscription: Subscription | undefined = undefined;

   constructor(private route: ActivatedRoute, private service: ProductsService) {  
    const id = this.route.snapshot.paramMap.get('id');
    if(id){
      this.subscription = this.service.getérpductById(id).subscribe(
        x => this.product = x
      );
    }
   }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
