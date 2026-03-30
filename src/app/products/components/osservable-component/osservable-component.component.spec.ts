import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OsservableComponentComponent } from './osservable-component.component';

describe('OsservableComponentComponent', () => {
  let component: OsservableComponentComponent;
  let fixture: ComponentFixture<OsservableComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OsservableComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OsservableComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
