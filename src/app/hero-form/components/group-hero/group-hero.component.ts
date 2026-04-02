import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-group-hero',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './group-hero.component.html',
  styleUrl: './group-hero.component.css'
})
export class GroupHeroComponent {
  myForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.myForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      alterEgo: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.myForm.valid) {
      console.log('Form submitted!');
      console.log(this.myForm.value);
    } else {
      console.log('Form is invalid');
    }
  }

  get name() {
    return this.myForm.get('name');
  }

  get alterEgo() {
    return this.myForm.get('alterEgo');
  }

}
