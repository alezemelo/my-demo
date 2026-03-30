import { Component } from '@angular/core';
import { of } from 'rxjs';

@Component({
  selector: 'app-osservable-component',
  imports: [],
  templateUrl: './osservable-component.component.html',
  styleUrl: './osservable-component.component.css'
})
export class OsservableComponentComponent {
  constructor() { 
    const myObservaable = of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10); //simula stream di dati che emette i numeri da 1 a 10 
    const myObserverm = {
      next: (value: number) => console.log(value), //stampa ogni valore emesso
      error: (err: any) => console.error('Error:', err), //gestisce eventuali errori
      complete: () => console.log('Stream completato') //notifica quando lo stream è completato
    };
    const mySubscription = myObservaable.subscribe(myObserverm);
  }
}
