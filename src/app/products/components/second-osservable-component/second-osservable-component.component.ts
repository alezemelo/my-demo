import { Component, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';
import { Observable, range } from 'rxjs';
import { map, filter, debounce, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-second-osservable-component',
  imports: [],
  templateUrl: './second-osservable-component.component.html',
  styleUrl: './second-osservable-component.component.css'
})
export class SecondOsservableComponentComponent implements OnChanges{
  @Input() valoreInput: number | undefined = undefined;
  valoreCalcolato: number=0;


  constructor(private service: ProductsService) {
      const sorgente$: Observable<number> = range(0,10); //tutti le variabili observable 
      // per convenzione utilizzano il simbolo $ alla fine del nome
      sorgente$.pipe(
        map((n) => n * 3),
        filter((n) => n % 2 === 0)
      ).subscribe(n => console.log(n)); //stampa i numeri da 0 a 9
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.valoreCalcolato = changes['valoreInput'].currentValue * 3;
    // Handle changes to the input property
    console.log(changes);
  }
}
