import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondOsservableComponentComponent } from './second-osservable-component.component';

describe('SecondOsservableComponentComponent', () => {
  let component: SecondOsservableComponentComponent;
  let fixture: ComponentFixture<SecondOsservableComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecondOsservableComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecondOsservableComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
