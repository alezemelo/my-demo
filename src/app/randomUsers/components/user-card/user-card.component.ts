import { Component, Input } from '@angular/core';
import { Result } from '../../models/randomUser'; 
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-user-card',
  imports: [NgIf],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css'
})
export class UserCardComponent {
  @Input() user: Result | undefined = undefined;
}
