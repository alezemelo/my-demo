import { Component } from '@angular/core';
import { ProductPageComponent } from "./products/components/product-page/product-page.component";
import { SecondOsservableComponentComponent } from './products/components/second-osservable-component/second-osservable-component.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProductPageComponent, SecondOsservableComponentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'my-demo';
  numero = 42;
  changeInput(){
    this.numero = this.numero + 1;
  }
}
