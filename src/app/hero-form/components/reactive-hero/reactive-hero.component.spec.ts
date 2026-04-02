import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveHeroComponent } from './reactive-hero.component';

describe('ReactiveHeroComponent', () => {
  let component: ReactiveHeroComponent;
  let fixture: ComponentFixture<ReactiveHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveHeroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReactiveHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
