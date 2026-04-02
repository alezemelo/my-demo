import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-reactive-hero',
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: './reactive-hero.component.html',
  styleUrl: './reactive-hero.component.css'
})
export class ReactiveHeroComponent {
  myControl = new FormControl('valore iniziale');
  constructor(){

    // this.myControl.valueChanges.subscribe(value => {
    //   console.log('Il valore del form control è cambiato:', value);
    // });

  }


}
