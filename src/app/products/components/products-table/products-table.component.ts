import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product';
import { MyFirstPipe } from "../../pipes/my-first.pipe";


@Component({
  selector: 'app-products-table',
  standalone: true,
  imports: [CommonModule, MyFirstPipe],
  templateUrl: './products-table.component.html',
  styleUrl: './products-table.component.css'
})
export class ProductsTableComponent {
    @Input() products: Product[] = []; //@Input perchè mi arriverà dall'esterno
    @Output() notify: EventEmitter<Product> = new EventEmitter(); //@Output perchè è un evento che emetterò all'esterno
    showDetails(product: Product): void {
        this.notify.emit(product);
    }
}
