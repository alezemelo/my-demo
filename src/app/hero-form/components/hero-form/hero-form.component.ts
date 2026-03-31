import { Component } from '@angular/core';
import { Hero } from '../../models/hero';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-hero-form',
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './hero-form.component.html',
  styleUrl: './hero-form.component.css'
})
export class HeroFormComponent {
  powers = ['Super forza', 'Volo', 'Vista a raggi X', 'Super udito'];

  hero= new Hero(1,'Superman','Super forza','Clark Kent');

  onSubmit(): void {
    console.log('Form submitted!');
    console.log(this.hero);
  }
}
